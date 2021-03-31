import React from "react";
import {
  LinkBox,
  Flex,
  Box,
  Heading,
  LinkOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { MdSettings } from "react-icons/md";
import { useColorScheme } from "theme";

interface BlockLinkProps {
  to: string;
  name: string;
  description?: string;
  onEditClick?: () => void;
  counts: { key: string; value: number }[];
}

export const BlockLink: React.FC<BlockLinkProps> = ({
  to,
  name,
  description,
  onEditClick,
  counts,
}) => {
  const colorScheme = useColorScheme();

  return (
    <LinkBox as="article" h="3xs" p="5" borderWidth="thin" rounded="lg">
      <Flex h="full" direction="column" justifyContent="space-between">
        <Flex p="2" justifyContent="space-between" overflow="hidden">
          <Box>
            <Heading size="lg" color={colorScheme}>
              <LinkOverlay as={RouterLink} to={to}>
                {name}
              </LinkOverlay>
            </Heading>
            <Text wordBreak="break-word">{description}</Text>
          </Box>
          {onEditClick ? (
            <IconButton
              ml="2"
              flexShrink={0}
              fontSize="xl"
              icon={<MdSettings />}
              aria-label="Settings"
              onClick={onEditClick}
            />
          ) : null}
        </Flex>
        <Flex p="2" mt="2" alignSelf="flex-end">
          {counts.map(({ key, value }, index) => (
            <Text
              mr={counts.length !== index + 1 ? "2" : undefined}
              key={index}
            >
              {key}: {value}
            </Text>
          ))}
        </Flex>
      </Flex>
    </LinkBox>
  );
};
