import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Card } from "models";
import { convertCardType } from "../packs/cards/convertCardType";

interface QuizCardProps {
  card: Card;
}

export const QuizCard: React.FC<QuizCardProps> = ({ card }) => {
  return (
    <Flex
      direction="column"
      minH="sm"
      p="5"
      borderWidth="thin"
      rounded="lg"
      bgColor={useColorModeValue("blackAlpha.50", "whiteAlpha.100")}
    >
      <Text h="6">{convertCardType(card.type)} Question:</Text>
      <Flex flex="auto" justify="center" align="center">
        <Text fontSize="xl">{card.question}</Text>
      </Flex>
      <Box h="6" />
    </Flex>
  );
};
