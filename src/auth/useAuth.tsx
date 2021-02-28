import React, { createContext, useContext, useState } from "react";

interface Auth {
  user: string | undefined;
  login: (callback: () => void) => void;
  logout: (callback: () => void) => void;
}

const AuthContext = createContext<Auth | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const useAuthProvider = () => {
  const [user, setUser] = useState<string>();

  const login = (callback: () => void) => {
    setUser("user");
    callback();
  };

  const logout = (callback: () => void) => {
    callback();
    setUser(undefined);
  };

  return {
    user,
    login,
    logout,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
