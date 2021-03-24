import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { PacksList } from "components/pages";

export const Group: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/packs`}>
        <PacksList packs={["groupPack0", "groupPack1", "groupPack2"]} />
      </Route>
      <Route path={path}>
        <Redirect to={`${url}/packs`} />
      </Route>
    </Switch>
  );
};
