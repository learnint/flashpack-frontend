import React, { useState } from "react";
import { Button, Heading, Stack } from "@chakra-ui/react";
import { Redirect, useParams, useRouteMatch } from "react-router-dom";
import { Form, Formik } from "formik";
import { ConfirmButton } from "components/common";
import { onePathBack } from "router";
import { Card as CardModel } from "models";
import { useColorScheme } from "theme";
import { CardInfo } from "./CardInfo";

interface CardProps {
  cards: CardModel[];
}

export const Card: React.FC<CardProps> = ({ cards }) => {
  const { url } = useRouteMatch();
  const { cardId } = useParams<{ cardId: string }>();
  const colorScheme = useColorScheme();

  // const { deleteCard } = useCard();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  const card = cards.find((card) => card.id === cardId);

  return (
    <>
      {card ? (
        <Stack w="full" maxW="container.sm">
          <Heading color={colorScheme}>Edit Card</Heading>
          <CardInfo card={card} isEditingState={[isEditing, setIsEditing]} />
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)}>Edit Card Info</Button>
              <Formik
                initialValues={{}}
                onSubmit={
                  () => {}
                  // async () => await deleteCard(card.id)
                }
              >
                {({ isSubmitting }) => (
                  <Form>
                    <ConfirmButton
                      type="submit"
                      isLoading={isSubmitting}
                      popoverText="Are you sure you want to delete this card? This action cannot be undone."
                      confirmText="Yes, Delete Card"
                    >
                      Delete Card
                    </ConfirmButton>
                  </Form>
                )}
              </Formik>
            </>
          ) : null}
        </Stack>
      ) : (
        <Redirect to={onePathBack(url)} />
      )}
    </>
  );
};
