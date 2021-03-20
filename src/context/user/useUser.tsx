import React, { createContext, useContext } from "react";
import { useToast } from "@chakra-ui/react";
import { User } from "models";
import { useQueryUser } from "api";

interface UserContext {
  user: User | undefined;
  isUserLoading: boolean;
  isUserError: boolean;
  // createUser: () => Promise<void>;
  // updateUser: () => Promise<void>;
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

  const { data, isLoading, isError } = useQueryUser({
    onError: (error) => {
      toast({
        title: error?.message,
        status: "error",
        isClosable: true,
      });
    },
  });

  return { user: data, isUserLoading: isLoading, isUserError: isError };
};

export const UserProvider: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={useUserProvider()}>
      {children}
    </UserContext.Provider>
  );
};
