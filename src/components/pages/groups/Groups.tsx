import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Group } from "./Group";

export const Groups: React.FC = () => {
  const { path, url } = useRouteMatch();

  const groupId = "123e4567-e89b-12d3-a456-426614174000";

  return (
    <Switch>
      <Route path={`${path}/:groupId`}>
        <Group />
      </Route>
      <Route path={path}>
        <Link to={`${url}/${groupId}`}>Group Name</Link>
      </Route>
    </Switch>
  );
};
