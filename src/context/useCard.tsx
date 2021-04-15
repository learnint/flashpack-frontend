import React, { createContext, useContext } from "react";
import { PostCardRequest, useMutateCreateCard, useQueryCards } from "api";
import { useToast } from "components/common";
import { Card } from "models";
import { useMutator } from "./config";

interface CardContext {
  cards: Card[] | undefined;
  isCardsLoading: boolean;
  isCardsError: boolean;
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

const useCardProvider = (packId: string) => {
  const { toast } = useToast();

  const mutator = useMutator();

  const mutateCreateCard = useMutateCreateCard();

  const { data, isLoading, isError } = useQueryCards(packId, {
    onError: (error) => {
      toast({
        title: error.message,
        status: "error",
      });
    },
  });

  const createCard = async (request: PostCardRequest) =>
    mutator(mutateCreateCard, request, "Card created!");

  return {
    cards: data,
    isCardsLoading: isLoading,
    isCardsError: isError,
    createCard,
  };
};

interface CardProviderProps {
  packId: string;
}

export const CardProvider: React.FC<CardProviderProps> = ({
  children,
  packId,
}) => {
  return (
    <CardContext.Provider value={useCardProvider(packId)}>
      {children}
    </CardContext.Provider>
  );
};
