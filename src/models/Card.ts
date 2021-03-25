import { Option } from "models";

export interface Card {
  id: string;
  type: "mc" | "tf" | "chk" | "blank";
  question: string;
  options: Option[];
}
