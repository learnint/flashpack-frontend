import React from "react";
import { Icon, Flex, Text, Box } from "@chakra-ui/react";
import { FaUsers, FaLayerGroup } from "react-icons/fa";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useColorScheme } from "theme";

export const MobileNav: React.FC = () => {
  const { pathname } = useLocation();
  const colorScheme = useColorScheme();

  return (
    <Flex mt="2">
      {/* <Box as={RouterLink} flex="1" to="/" replace={pathname === "/"}>
        <Flex direction="column" alignItems="center">
          <Icon
            as={FaHome}
            w={8}
            h={8}
            color={pathname === "/" ? colorScheme : undefined}
          />
          <Text color={pathname === "/" ? colorScheme : undefined}>Home</Text>
        </Flex>
      </Box> */}
      <Box as={RouterLink} flex="1" to="/packs" replace={pathname === "/packs"}>
        <Flex direction="column" alignItems="center">
          <Icon
            as={FaLayerGroup}
            w={8}
            h={8}
            color={pathname.startsWith("/packs") ? colorScheme : undefined}
          />
          <Text color={pathname.startsWith("/packs") ? colorScheme : undefined}>
            Packs
          </Text>
        </Flex>
      </Box>
      <Box
        as={RouterLink}
        flex="1"
        to="/groups"
        replace={pathname === "/groups"}
      >
        <Flex direction="column" alignItems="center">
          <Icon
            as={FaUsers}
            w={8}
            h={8}
            color={pathname.startsWith("/groups") ? colorScheme : undefined}
          />
          <Text
            color={pathname.startsWith("/groups") ? colorScheme : undefined}
          >
            Groups
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};
