import React from "react";
import { Button } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import { useAuth, useLocationState } from "auth";

export const CreateAccount: React.FC = () => {
  const history = useHistory();
  const { from } = useLocationState();
  const auth = useAuth();

  return (
    <>
      <Button onClick={() => auth.login(() => history.replace(from))}>
        Create Account
      </Button>
      <Link
        to={{
          pathname: "/login",
          state: { from: from },
        }}
        replace
      >
        Already have an account? Login
      </Link>
    </>
  );
};
