import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Pack as PackModel } from "models";
import { Pack } from "./Pack";

interface PacksListProps {
  packs: PackModel[];
}

export const PacksList: React.FC<PacksListProps> = ({ packs }) => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:packId`}>
        <Pack packs={packs} />
      </Route>
      <Route path={path}>
        {packs.map((pack) => (
          <Link to={`${url}/${pack.id}`} key={pack.id}>
            {pack.name}
          </Link>
        ))}
      </Route>
    </Switch>
  );
};
