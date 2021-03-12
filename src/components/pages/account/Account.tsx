import React, { useState } from "react";
import { Button, Flex, Stack } from "@chakra-ui/react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useAuth } from "auth";
import { AccountInfo } from "./AccountInfo";
import { ChangePassword } from "./changePassword";

export const Account: React.FC = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const auth = useAuth();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Flex w="full" maxW="container.sm" direction="column">
      <Switch>
        <Route path={`${path}/changePassword`}>
          <ChangePassword />
        </Route>
        <Route path={path}>
          <AccountInfo isEditingState={[isEditing, setIsEditing]} />
          {!isEditing ? (
            <Stack spacing="2" mt="2">
              <Button onClick={() => setIsEditing(true)}>
                Edit Account Info
              </Button>
              <Button onClick={() => history.push(`${url}/changePassword`)}>
                Change Password
              </Button>
              <Button onClick={() => auth.logout(() => history.push("/"))}>
                Logout
              </Button>
            </Stack>
          ) : null}
        </Route>
      </Switch>
    </Flex>
  );
};
