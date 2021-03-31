import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { Pack as PackModel } from "models";
import { BlockLink } from "components/common";
import { Pack } from "./Pack";

const packs: PackModel[] = [
  {
    id: "p1",
    name: "Math Midterm",
    description: "To help me study for my math midterm",
    cards: [],
  },
  {
    id: "p2",
    name: "Science Final",
    description: "To help me study for my science final",
    cards: [],
  },
  {
    id: "p3",
    name: "Trivia!",
    cards: [],
  },
];

const groupPacks: PackModel[] = [
  {
    id: "p4",
    name: "Test 1",
    cards: [],
  },
  {
    id: "p5",
    name: "Test 2",
    cards: [],
  },
  {
    id: "p6",
    name: "Test 3!",
    cards: [],
  },
];

interface PacksListProps {
  groupId?: string;
  isAdmin?: boolean;
}

export const PacksList: React.FC<PacksListProps> = ({
  groupId,
  isAdmin = true,
}) => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:packId`}>
        <Pack packs={packs} />
      </Route>
      <Route path={path}>
        {(groupId ? groupPacks : packs).map(
          ({ id, name, description, cards }) => (
            <BlockLink
              to={`${url}/${id}`}
              name={name}
              description={description}
              onEditClick={isAdmin ? () => {} : undefined}
              counts={[{ key: "Cards", value: cards.length }]}
              key={id}
            />
          )
        )}
      </Route>
    </Switch>
  );
};
