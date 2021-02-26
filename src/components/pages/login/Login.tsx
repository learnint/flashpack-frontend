import React from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "auth";

interface HistoryLocationState {
  from: {
    pathname: string;
  };
}

export const Login: React.FC = () => {
  const history = useHistory<HistoryLocationState>();
  const auth = useAuth();

  const { from } = history.location.state || { from: { pathname: "/" } };

  console.log(history);

  return (
    <Button onClick={() => auth.login(() => history.replace(from))}>
      Login
    </Button>
  );
};
