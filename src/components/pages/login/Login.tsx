import React from "react";
import { Button } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useAuth, useLocationState } from "auth";

export const Login: React.FC = () => {
  const history = useHistory();
  const { from } = useLocationState();
  const auth = useAuth();

  return (
    <>
      <Button onClick={() => auth.login(() => history.replace(from))}>
        Login
      </Button>
      <Link
        to={{
          pathname: "/createAccount",
          state: { from: from },
        }}
        replace
      >
        Create Account
      </Link>
    </>
  );
};
