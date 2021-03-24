import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Pack } from "./Pack";

export const Packs: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:packId`}>
        <Pack />
      </Route>
      <Route path={path}>
        <Link to={`${url}/userPack1`}>Pack 1</Link>
        <Link to={`${url}/userPack2`}>Pack 2</Link>
        <Link to={`${url}/userPack3`}>Pack 3</Link>
      </Route>
    </Switch>
  );
};
