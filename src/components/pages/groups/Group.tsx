import React from "react";
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { PathParamRedirect } from "router";
import { Group as GroupModel } from "models";
import { PacksList } from "components/pages";

interface GroupProps {
  groups: GroupModel[];
}

export const Group: React.FC<GroupProps> = ({ groups }) => {
  const { path, url } = useRouteMatch();
  const { groupId } = useParams<{ groupId: string }>();

  const group = groups.find((group) => group.id === groupId);

  return (
    <>
      {group ? (
        <Switch>
          <Route path={`${path}/packs`}>
            <PacksList packs={group.packs} />
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
