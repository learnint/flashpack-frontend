import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Group as GroupModel } from "models";
import { Packs } from "components/pages";
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

  const group = groups.find((group) => group.id === groupId);

  return (
    <>
      {group ? (
        <Switch>
          <Route path={`${path}/packs`}>
            <Packs group={group}>
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
            </Packs>
          </Route>
          <Route path={`${path}/settings`}>
            {group.isAdmin ? (
              <GroupSettings group={group} />
            ) : (
              <Redirect to={`/groups/${group.id}`} />
            )}
          </Route>
          <Route path={`${path}/members`}>
            <GroupMembers group={group} />
          </Route>
          <Route path={`${path}/invite`}>
            {group.isAdmin ? (
              <GroupInvite group={group} />
            ) : (
              <Redirect to={`/groups/${group.id}`} />
            )}
          </Route>
          <Route path={path}>
            <Redirect to={`${url}/packs`} />
          </Route>
        </Switch>
      ) : (
        <Redirect to="/groups" />
      )}
    </>
  );
};
