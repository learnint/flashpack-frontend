import React from "react";
import { useCard } from "context";
import { Card, State } from "models";

interface CardInfoProps {
  card: Card;
  isEditingState: State<boolean>;
}

export const CardInfo: React.FC<CardInfoProps> = ({ card, isEditingState }) => {
  // const { deleteCard } = useCard();

  const [isEditing, setIsEditing] = isEditingState;

  return <div></div>;
};
