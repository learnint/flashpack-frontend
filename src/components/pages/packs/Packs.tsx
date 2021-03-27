import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Pack } from "models";
import { useColorScheme } from "theme";
import { PacksList } from "./PacksList";

const packs: Pack[] = [
  {
    id: "p1",
    name: "Math Midterm",
    description: "To help me study for my math midterm",
    cards: [],
  },
  {
    id: "p2",
    name: "Science Final",
    description: "To help me study for my science final",
    cards: [],
  },
  {
    id: "p3",
    name: "Trivia!",
    cards: [],
  },
];

export const Packs: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack w="full" maxW="container.lg">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>My Packs</Heading>
        <Button>Create Pack</Button>
      </Flex>
      <PacksList packs={packs} />
    </Stack>
  );
};
