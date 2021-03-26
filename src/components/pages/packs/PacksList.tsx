import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Pack as PackModel } from "models";
import { BlockLink } from "components/common";
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
        {packs.map(({ id, name, description, cards }) => (
          <BlockLink
            to={`${url}/${id}`}
            name={name}
            description={description}
            counts={[{ key: "Cards", value: cards.length }]}
            key={id}
          />
        ))}
      </Route>
    </Switch>
  );
};
