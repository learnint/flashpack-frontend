import React from "react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "auth";

export const Account: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();

  return (
    <Button
      colorScheme="purple"
      onClick={() => auth.logout(() => history.push("/"))}
    >
      Logout
    </Button>
  );
};
