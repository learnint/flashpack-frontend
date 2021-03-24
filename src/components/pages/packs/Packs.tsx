import React from "react";
import { PacksList } from "./PacksList";

export const Packs: React.FC = () => {
  return <PacksList packs={["userPack0", "userPack1", "userPack2"]} />;
};
