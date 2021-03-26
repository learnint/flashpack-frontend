import React, { createContext, useContext, useState } from "react";
import { useQueryClient } from "react-query";
import {
  PostLoginRequest,
  PostUserRequest,
  useMutateCreateUser,
  useMutateLogin,
} from "api";
import { useToast } from "components/common";

interface AuthContext {
  accessToken: string | undefined;
  createAccount: (request: PostUserRequest) => Promise<boolean>;
  login: (request: PostLoginRequest) => Promise<boolean>;
  logout: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AuthContext = createContext<AuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

const useAuthProvider = () => {
  const queryClient = useQueryClient();
  const mutateCreateUser = useMutateCreateUser();
  const mutateLogin = useMutateLogin();

  const { toast, closeAll } = useToast();

  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem("accessToken") || undefined
  );

  const createAccount = async (request: PostUserRequest) => {
    closeAll();
    try {
      await mutateCreateUser.mutateAsync(request);
      toast({
        title: "Account created!",
        description: "Please login",
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

  const login = async (request: PostLoginRequest) => {
    closeAll();
    try {
      const data = await mutateLogin.mutateAsync(request);
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      toast({
        title: "Successfully logged in!",
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

  const logout = () => {
    queryClient.clear();
    setAccessToken(undefined);
    localStorage.removeItem("accessToken");
  };

  return {
    accessToken,
    createAccount,
    login,
    logout,
  };
};

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <AuthContext.Provider value={useAuthProvider()}>
      {children}
    </AuthContext.Provider>
  );
};
