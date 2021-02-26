import React from "react";
import { Button } from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuth } from "auth";

interface LocationState {
  from: {
    pathname: string;
  };
}

export const Login: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const auth = useAuth();

  const { from } = location.state || { from: { pathname: "/" } };

  console.log(history);

  return (
    <Button onClick={() => auth.login(() => history.replace(from))}>
      Login
    </Button>
  );
};
