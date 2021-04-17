import { CardType } from "models";

export const getDefaultCardOptions = (
  type: CardType,
  prevType: CardType,
  prevOptions: string[]
) => {
  switch (type) {
    case CardType.TF:
      return ["True", "False"];
    case CardType.MC:
    case CardType.CHK:
      return prevType === CardType.MC || prevType === CardType.CHK
        ? prevOptions
        : ["", "", ""];
    case CardType.BLANK:
      return [""];
  }
};
