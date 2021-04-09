import React, { useState } from "react";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { useAuth } from "auth";
import { useUser } from "context";
import { useColorScheme } from "theme";
import { AccountInfo } from "./AccountInfo";
import { ChangePassword } from "./changePassword";

export const Account: React.FC = () => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const colorScheme = useColorScheme();
  const { logout } = useAuth();
  const { isUserLoading, isUserError } = useUser();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Switch>
        <Route path={`${path}/changePassword`}>
          <ChangePassword />
        </Route>
        <Route path={path}>
          <Heading color={colorScheme}>Account</Heading>
          <AccountInfo isEditingState={[isEditing, setIsEditing]} />
          {!isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                isDisabled={isUserLoading || isUserError}
              >
                Edit Account Info
              </Button>
              <Button
                onClick={() => history.push(`${url}/changePassword`)}
                isDisabled={isUserLoading || isUserError}
              >
                Change Password
              </Button>
              <Button
                onClick={() => {
                  history.replace("/");
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          ) : null}
        </Route>
      </Switch>
    </Stack>
  );
};
