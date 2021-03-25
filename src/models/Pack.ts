import { Card } from "models";

export interface Pack {
  id: string;
  name: string;
  description?: string;
  cards: Card[];
}
