import React from "react";
import { Button, Stack } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export const App: React.FC = () => {
  return (
    <Stack w="100vw" h="100vh">
      <Navbar />
      <Stack flex="auto" overflow="auto">
        <Button colorScheme="purple">Test Button</Button>
      </Stack>
    </Stack>
  );
};
