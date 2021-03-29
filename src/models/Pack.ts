import { Card, Group } from "models";

export interface Pack {
  id: string;
  name: string;
  description?: string;
  cards: Card[];
  group?: Group; // only if getting packs by all (both group & user) type
}
