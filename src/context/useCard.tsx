import React, { createContext, useContext } from "react";
import { PostCardRequest, useMutateCreateCard } from "api";
import { useToast } from "components/common";
import { useMutator } from "./config";

interface CardContext {
  createCard: (request: PostCardRequest) => Promise<boolean>;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const CardContext = createContext<CardContext | undefined>(undefined);

export const useCard = () => {
  const context = useContext(CardContext);

  if (context === undefined) {
    throw new Error("useCard must be used within a CardProvider");
  }

  return context;
};

const useCardProvider = () => {
  const { toast } = useToast();

  const mutator = useMutator();

  const mutateCreateCard = useMutateCreateCard();

  const createCard = async (request: PostCardRequest) =>
    mutator(mutateCreateCard, request, "Card created!");

  return { createCard };
};

export const CardProvider: React.FC = ({ children }) => {
  return (
    <CardContext.Provider value={useCardProvider()}>
      {children}
    </CardContext.Provider>
  );
};
