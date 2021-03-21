import React, { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { User } from "models";
import { PutUserRequest, useMutateUpdateUser, useQueryUser } from "api";

interface UserContext {
  user: User | undefined;
  isUserLoading: boolean;
  isUserError: boolean;
  // createUser: () => Promise<void>;
  updateUser: (user: PutUserRequest) => Promise<boolean>;
  // changePassword: () => Promise<void>;
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
  const toast = useToast();

  const mutateUpdateUser = useMutateUpdateUser();

  const { data, isLoading, isError } = useQueryUser({
    onError: (error) => {
      toast({
        title: error?.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  const updateUser = async (user: PutUserRequest) => {
    try {
      await mutateUpdateUser.mutateAsync(user);
      return true;
    } catch (error) {
      toast({
        title: error?.message,
        status: "error",
        isClosable: true,
      });
      return false;
    }
  };

  return {
    user: data,
    isUserLoading: isLoading,
    isUserError: isError,
    updateUser,
  };
};

export const UserProvider: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={useUserProvider()}>
      {children}
    </UserContext.Provider>
  );
};
