import React from "react";
import { Box, useColorModeValue, Flex, Heading } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Navbar: React.FC = () => {
  return (
    <>
      <Box h="2" bgColor={useColorModeValue("purple.600", "purple.300")} />
      <Flex px="4" py="2" alignItems="center">
        <Heading mr="auto" size="md">
          Flashpack
        </Heading>
        <ColorModeSwitcher />
      </Flex>
    </>
  );
};
