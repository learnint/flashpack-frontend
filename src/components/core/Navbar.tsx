import React from "react";
import { Box, Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "auth";
import { useColorScheme } from "theme";
import { FaUser } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

export const Navbar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const colorScheme = useColorScheme();

  return (
    <>
      <Box h="2" bgColor={colorScheme} />
      <Flex px="4" py="2" alignItems="center">
        <Heading color={colorScheme} mr="auto" size="md">
          <Link to="/">Flashpack</Link>
        </Heading>
        <ColorModeSwitcher />
        {location.pathname !== "/login" &&
          (auth.user ? (
            <IconButton
              ml="2"
              variant="ghost"
              fontSize="lg"
              icon={<FaUser />}
              aria-label="User Account"
              onClick={() => history.push("/account")}
            />
          ) : (
            <Button
              ml="2"
              variant="outline"
              fontSize="lg"
              onClick={() => history.push("/login", { from: location })}
            >
              Login
            </Button>
          ))}
      </Flex>
    </>
  );
};
