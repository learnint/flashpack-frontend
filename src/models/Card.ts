import { Option } from "models";

export interface Card {
  id: string;
  type: CardType;
  question: string;
  options: Option[];
}

export type CardType = "tf" | "mc" | "chk" | "blank";
