import React from "react";
import { Flex, Avatar, Divider, Text } from "@chakra-ui/react";
import { User } from "models";
import { useColorScheme } from "theme";

interface MembersListProps {
  users: User[];
  createdByUserId: string;
}

export const MembersList: React.FC<MembersListProps> = ({
  users,
  createdByUserId,
}) => {
  const colorScheme = useColorScheme();
  const grayColorScheme = useColorScheme("gray", true);

  return (
    <>
      {users.map(({ id, firstName, lastName }, index) => (
        <React.Fragment key={id}>
          <Flex alignItems="center">
            <Avatar
              name={`${firstName} ${lastName}`}
              bg={colorScheme}
              color={grayColorScheme}
            />
            <Divider orientation="vertical" mx="4" />
            <Text>
              {firstName} {lastName}
            </Text>
            {createdByUserId === id ? <Text ml="auto">Admin</Text> : null}
          </Flex>
          {users.length !== index + 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </>
  );
};
