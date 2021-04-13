import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useColorScheme } from "theme";
import { Pack } from "models";
import { CreateCard } from "./create";

interface CardsProps {
  pack: Pack;
}

export const Cards: React.FC<CardsProps> = ({ children, pack }) => {
  const colorScheme = useColorScheme();

  return (
    <Stack w="full" maxW="container.lg">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>{pack.name} - Cards</Heading>
        <Flex justifyContent="flex-end" wrap="wrap">
          {children}
          <Button ml="2">Create Card</Button>
        </Flex>
      </Flex>
      <CreateCard pack={pack} groupId="" />
    </Stack>
  );
};
