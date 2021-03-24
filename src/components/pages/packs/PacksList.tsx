import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Pack } from "./Pack";

interface PacksListProps {
  packs: string[];
}

export const PacksList: React.FC<PacksListProps> = ({ packs }) => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:packId`}>
        <Pack />
      </Route>
      <Route path={path}>
        {packs.map((pack, index) => (
          <Link to={`${url}/${pack}`} key={index}>
            Pack {index}
          </Link>
        ))}
      </Route>
    </Switch>
  );
};
