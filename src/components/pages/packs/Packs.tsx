import React from "react";
import { PacksList } from "./PacksList";
import { Pack } from "models";

const packs: Pack[] = [
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

export const Packs: React.FC = () => {
  return <PacksList packs={packs} />;
};
