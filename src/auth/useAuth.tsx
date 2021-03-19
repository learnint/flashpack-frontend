import React, { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import { useLocationState } from "router";
import { useMutateLogin } from "api";

interface AuthContext {
  accessToken: string | undefined;
  login: (email: string, password: string) => Promise<void>;
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
  const history = useHistory();
  const { from } = useLocationState();

  const queryClient = useQueryClient();
  const mutateLogin = useMutateLogin();

  const toast = useToast();

  const [accessToken, setAccessToken] = useState<string | undefined>(
    localStorage.getItem("accessToken") || undefined
  );

  const login = async (email: string, password: string) => {
    try {
      const data = await mutateLogin.mutateAsync({ email, password });
      // const data = { accessToken: "token" };
      setAccessToken(data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
      history.replace(from);
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  const logout = () => {
    // history.push("/");
    queryClient.clear();
    setAccessToken(undefined);
    localStorage.removeItem("accessToken");
  };

  return {
    accessToken,
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
