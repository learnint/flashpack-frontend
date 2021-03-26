import React, { createContext, useContext } from "react";
import {
  PatchChangePasswordRequest,
  PutUserRequest,
  useMutateChangePassword,
  useMutateUpdateUser,
  useQueryUser,
} from "api";
import { useToast } from "components/common";
import { User } from "models";

interface UserContext {
  user: User | undefined;
  isUserLoading: boolean;
  isUserError: boolean;
  updateUser: (request: PutUserRequest) => Promise<boolean>;
  changePassword: (request: PatchChangePasswordRequest) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const UserContext = createContext<UserContext | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

const useUserProvider = () => {
  const { toast, closeAll } = useToast();

  const mutateUpdateUser = useMutateUpdateUser();
  const mutateChangePassword = useMutateChangePassword();

  const { data, isLoading, isError } = useQueryUser({
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
  });

  const updateUser = async (request: PutUserRequest) => {
    closeAll();
    try {
      await mutateUpdateUser.mutateAsync(request);
      toast({
        title: "Account info updated!",
        status: "success",
      });
      return true;
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
      });
      return false;
    }
  };

  const changePassword = async (request: PatchChangePasswordRequest) => {
    closeAll();
    try {
      await mutateChangePassword.mutateAsync(request);
      toast({
        title: "Password successfully changed!",
        status: "success",
      });
      return true;
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
      });
      return false;
    }
  };

  return {
    user: data,
    isUserLoading: isLoading,
    isUserError: isError,
    updateUser,
    changePassword,
  };
};

export const UserProvider: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={useUserProvider()}>
      {children}
    </UserContext.Provider>
  );
};
