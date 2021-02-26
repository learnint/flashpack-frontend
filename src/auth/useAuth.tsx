import React, { createContext, useContext, useState } from "react";

interface Auth {
  user: string | undefined;
  login: (callback: () => void) => void;
  logout: (callback: () => void) => void;
}

const authContext = createContext<Auth | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(authContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const useAuthProvider = () => {
  const [user, setUser] = useState<string>();

  const login = (callback: () => void) => {
    return fakeAuth.signin(() => {
      setUser("user");
      callback();
    });
  };

  const logout = (callback: () => void) => {
    return fakeAuth.signout(() => {
      setUser(undefined);
      callback();
    });
  };

  return {
    user,
    login,
    logout,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const fakeAuth = {
  isAuthenticated: false,
  signin(callback: () => void) {
    fakeAuth.isAuthenticated = true;
    setTimeout(callback, 100);
  },
  signout(callback: () => void) {
    fakeAuth.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
