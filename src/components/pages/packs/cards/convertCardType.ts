import { CardType } from "models";

export const convertCardType = (type: CardType) => {
  switch (type) {
    case CardType.TF:
      return "True/False";
    case CardType.MC:
      return "Multiple Choice";
    case CardType.CHK:
      return "Check All That Apply";
    case CardType.BLANK:
      return "Fill In The Blank";
  }
};
