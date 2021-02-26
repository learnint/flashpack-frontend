import React from "react";
import { Box, Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "auth";
import { useColorScheme } from "theme";
import { FaUser } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Navbar: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  const colorScheme = useColorScheme();

  return (
    <>
      <Box h="2" bgColor={colorScheme} />
      <Flex px="4" py="2" alignItems="center">
        <Heading color={colorScheme} mr="auto" size="md">
          Flashpack
        </Heading>
        <ColorModeSwitcher mr="2" />
        {auth.user ? (
          <IconButton
            variant="ghost"
            fontSize="lg"
            icon={<FaUser />}
            aria-label="User Account"
            onClick={() => history.push("/account")}
          />
        ) : (
          <Button
            variant="outline"
            fontSize="lg"
            onClick={() => {
              if (history.location.pathname !== "/login") {
                history.push({
                  pathname: "/login",
                  state: { from: history.location },
                });
              }
            }}
          >
            Login
          </Button>
        )}
      </Flex>
    </>
  );
};
