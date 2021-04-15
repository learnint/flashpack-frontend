import { Option } from "models";

export interface Card {
  id: string;
  type: CardType;
  question: string;
  options: Option[];
}

export enum CardType {
  MC = "MC",
  TF = "TF",
  CHK = "CHK",
  BLANK = "BLANK",
}
