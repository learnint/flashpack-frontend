import React from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
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
            <Flex justifyContent="space-between">
              <Heading color={colorScheme}>{group.name} Packs</Heading>
              {group.isAdmin ? (
                <Flex justifyContent="flex-end" wrap="wrap">
                  <Button
                    ml="2"
                    mb="2"
                    onClick={() => history.push(`${url}/settings`)}
                  >
                    Settings
                  </Button>
                  <Button ml="2">Create Pack</Button>
                </Flex>
              ) : null}
            </Flex>
            <PacksList groupId={groupId} isAdmin={group.isAdmin} />
          </Route>
          <Route path={`${path}/settings`}>
            <GroupSettings group={group} />
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
