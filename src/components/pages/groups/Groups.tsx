import React from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import { Group as GroupModel } from "models";
import { Group } from "./Group";

const groups: GroupModel[] = [
  {
    id: "g1",
    name: "PROG1820",
    description: "Programming practice",
    tags: ["Programming", "School"],
    users: [],
    packs: [
      {
        id: "p3",
        name: "Quiz 1",
        cards: [],
      },
      {
        id: "p4",
        name: "Quiz 2",
        cards: [],
      },
      {
        id: "p5",
        name: "Quiz 3",
        cards: [],
      },
    ],
  },
  {
    id: "g2",
    name: "MATH101",
    description: "Math class",
    tags: [],
    users: [],
    packs: [
      {
        id: "p7",
        name: "Midterm",
        cards: [],
      },
      {
        id: "p8",
        name: "Final",
        cards: [],
      },
    ],
  },
];

export const Groups: React.FC = () => {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:groupId`}>
        <Group groups={groups} />
      </Route>
      <Route path={path}>
        {groups.map((group) => (
          <Link to={`${url}/${group.id}`} key={group.id}>
            {group.name}
          </Link>
        ))}
      </Route>
    </Switch>
  );
};
