import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { useGroup } from "context";
import { ConfirmButton } from "components/common";
import { Group } from "models";
import { useColorScheme } from "theme";
import { MembersList } from "./MembersList";

interface GroupMembersProps {
  group: Group;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();

  const { leaveGroup } = useGroup();

  const { id, name, isAdmin, createdByUserId, users } = group;

  const members = users.filter((user) => user.isJoined);
  const invited = users.filter((user) => !user.isJoined);

  return (
    <Stack w="full" maxW="container.sm" spacing="4">
      <Flex justifyContent="space-between">
        <Heading color={colorScheme}>{name} Members</Heading>
        {isAdmin ? (
          <Button onClick={() => history.push(`/groups/${id}/invite`)}>
            Invite
          </Button>
        ) : (
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              const success = await leaveGroup(id);
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
      <MembersList users={members} createdByUserId={createdByUserId} />
      {group.isAdmin && invited.length > 0 ? (
        <>
          <Heading size="md">Invited</Heading>
          <MembersList users={invited} createdByUserId={createdByUserId} />
        </>
      ) : null}
    </Stack>
  );
};
