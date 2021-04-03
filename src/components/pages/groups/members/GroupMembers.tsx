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
import { Formik, Form } from "formik";
import { useGroup } from "context";
import { ConfirmButton } from "components/common";
import { Group } from "models";
import { useColorScheme } from "theme";

interface GroupMembersProps {
  group: Group;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const grayColorScheme = useColorScheme("gray", true);

  const { leaveGroup } = useGroup();

  return (
    <Stack w="full" maxW="container.sm" spacing="4">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>{group.name} Members</Heading>
        {group.isAdmin ? (
          <Button onClick={() => history.push(`/groups/${group.id}/invite`)}>
            Invite
          </Button>
        ) : (
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              const success = await leaveGroup(group.id);
              if (success) {
                history.push("/groups");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <ConfirmButton
                  type="submit"
                  isLoading={isSubmitting}
                  popoverText="Are you sure you want to leave this group? This action cannot be undone."
                  confirmText="Yes, Leave Group"
                >
                  Leave Group
                </ConfirmButton>
              </Form>
            )}
          </Formik>
        )}
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
          </Flex>
          {group.users.length !== index + 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Stack>
  );
};
