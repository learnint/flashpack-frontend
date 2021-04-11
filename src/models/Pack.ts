import { Card, Group } from "models";

export interface Pack {
  id: string;
  name: string;
  description?: string;
  cardCount: number;
  group?: Group;
  cards?: Card[];
}
