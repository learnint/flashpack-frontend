import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { PathParamRedirect } from "router";
import { Group as GroupModel } from "models";
import { useColorScheme } from "theme";
import { PacksList } from "components/pages";
import { GroupSettings } from "./settings";
import { GroupMembers } from "./members";
import { GroupInvite } from "./invite";

interface GroupProps {
  groups: GroupModel[];
}

export const Group: React.FC<GroupProps> = ({ groups }) => {
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { groupId } = useParams<{ groupId: string }>();
  const colorScheme = useColorScheme();

  const group = groups.find((group) => group.id === groupId);

  return (
    <>
      {group ? (
        <Switch>
          <Route path={`${path}/packs`}>
            <Stack w="full" maxW="container.lg">
              <Flex justifyContent="space-between">
                <Heading color={colorScheme}>{group.name} Packs</Heading>
                <Flex justifyContent="flex-end" wrap="wrap">
                  {group.isAdmin ? (
                    <>
                      <Button
                        ml="2"
                        mb="2"
                        onClick={() => history.push(`${url}/settings`)}
                      >
                        Settings
                      </Button>
                      <Button ml="2">Create Pack</Button>
                    </>
                  ) : (
                    <Button onClick={() => history.push(`${url}/members`)}>
                      Members
                    </Button>
                  )}
                </Flex>
              </Flex>
              <PacksList groupId={groupId} isAdmin={group.isAdmin} />
            </Stack>
          </Route>
          <Route path={`${path}/settings`}>
            <GroupSettings group={group} />
          </Route>
          <Route path={`${path}/members`}>
            <GroupMembers group={group} />
          </Route>
          <Route path={`${path}/invite`}>
            <GroupInvite group={group} />
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/packs`} />
          </Route>
        </Switch>
      ) : (
        <PathParamRedirect />
      )}
    </>
  );
};
