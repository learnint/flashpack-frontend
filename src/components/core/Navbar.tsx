import React from "react";
import { Box, Flex, Heading, Button, IconButton } from "@chakra-ui/react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "auth";
import { useColorScheme } from "theme";
import { FaUser } from "react-icons/fa";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

interface NavbarProps {
  isAnonRoute: boolean;
  isMobile: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isAnonRoute, isMobile }) => {
  const history = useHistory();
  const location = useLocation();
  const { accessToken } = useAuth();
  const colorScheme = useColorScheme();

  return (
    <>
      <Box h="2" bgColor={colorScheme} />
      <Flex px="4" py="2" alignItems="center">
        <Heading color={colorScheme} size="md">
          Flashpack
        </Heading>
        {!isAnonRoute && !isMobile ? (
          <Flex w="3xs" justifyContent="space-between" ml="16" pt="0.5">
            <Heading
              size="sm"
              color={location.pathname === "/" ? colorScheme : undefined}
            >
              <RouterLink to="/" replace={location.pathname === "/"}>
                Home
              </RouterLink>
            </Heading>
            <Heading
              size="sm"
              color={
                location.pathname.startsWith("/packs") ? colorScheme : undefined
              }
            >
              <RouterLink to="/packs" replace={location.pathname === "/packs"}>
                Packs
              </RouterLink>
            </Heading>
            <Heading
              size="sm"
              color={
                location.pathname.startsWith("/groups")
                  ? colorScheme
                  : undefined
              }
            >
              <RouterLink
                to="/groups"
                replace={location.pathname === "/groups"}
              >
                Groups
              </RouterLink>
            </Heading>
          </Flex>
        ) : null}
        <Box ml="auto">
          {!isAnonRoute ? (
            accessToken ? (
              <IconButton
                mr="2"
                variant="ghost"
                fontSize="lg"
                icon={<FaUser />}
                aria-label="User Account"
                onClick={() => {
                  if (location.pathname !== "/account") {
                    history.push("/account");
                  }
                }}
              />
            ) : (
              <Button
                mr="2"
                variant="outline"
                fontSize="lg"
                onClick={() => history.push("/login", { from: location })}
              >
                Login
              </Button>
            )
          ) : null}
          <ColorModeSwitcher />
        </Box>
      </Flex>
    </>
  );
};
