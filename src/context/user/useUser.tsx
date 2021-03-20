import React, { createContext, useContext } from "react";
import { User } from "models";
import { useQueryUser } from "api";

interface UserContext {
  user: User | undefined;
  isUserLoading: boolean;
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
  const { data: user, isLoading: isUserLoading } = useQueryUser();
  return { user, isUserLoading };
};

export const UserProvider: React.FC = ({ children }) => {
  return (
    <UserContext.Provider value={useUserProvider()}>
      {children}
    </UserContext.Provider>
  );
};
