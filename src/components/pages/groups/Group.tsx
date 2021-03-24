import React from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import { Pack } from "components/pages";

export const Group: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/packs/:packId`}>
        <Pack />
      </Route>
      <Route path={`${path}/packs`}>
        <Link to={`${url}/packs/groupPack1`}>Pack 1</Link>
        <Link to={`${url}/packs/groupPack2`}>Pack 2</Link>
        <Link to={`${url}/packs/groupPack3`}>Pack 3</Link>
      </Route>
      <Route path={path}>
        <Redirect to={`${url}/packs`} />
      </Route>
    </Switch>
  );
};
