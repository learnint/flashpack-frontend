import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export const App: React.FC = () => {
  return (
    <Flex w="100vw" h="100vh" flexDirection="column">
      <Navbar />
      <Box flex="auto" overflow="auto">
        <Button colorScheme="purple">Test Button</Button>
      </Box>
    </Flex>
  );
};
