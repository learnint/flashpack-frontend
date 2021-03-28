import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useColorScheme } from "theme";
import { PacksList } from "./PacksList";

export const Packs: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack w="full" maxW="container.lg">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>My Packs</Heading>
        <Button>Create Pack</Button>
      </Flex>
      <PacksList />
    </Stack>
  );
};
