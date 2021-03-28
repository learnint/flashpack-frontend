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
import { useMutator } from "./config";

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
  const { toast } = useToast();

  const mutator = useMutator();

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

  const updateUser = (request: PutUserRequest) =>
    mutator(mutateUpdateUser, request, "Account info updated!");

  const changePassword = (request: PatchChangePasswordRequest) =>
    mutator(mutateChangePassword, request, "Password successfully changed!");

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
