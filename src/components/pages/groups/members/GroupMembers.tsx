import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Group } from "models";
import { useColorScheme } from "theme";

interface GroupMembersProps {
  group: Group;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const grayColorScheme = useColorScheme("gray", true);

  return (
    <Stack w="full" maxW="container.sm">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>{group.name} Members</Heading>
        {group.isAdmin ? (
          <Button onClick={() => history.push(`/groups/${group.id}/invite`)}>
            Invite
          </Button>
        ) : null}
      </Flex>
      {group.users.map(({ id, firstName, lastName }, index) => (
        <React.Fragment key={id}>
          <Flex alignItems="center">
            <Avatar
              name={`${firstName} ${lastName}`}
              bg={colorScheme}
              color={grayColorScheme}
            />
            <Divider orientation="vertical" mx="4" />
            <Box>
              {firstName} {lastName}
            </Box>
            <Divider orientation="vertical" ml="auto" />
          </Flex>
          {group.users.length !== index + 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
      {!group.isAdmin ? <Button colorScheme="red">Leave Group</Button> : null}
    </Stack>
  );
};
