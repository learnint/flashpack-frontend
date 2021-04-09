import React, { useState } from "react";
import { Heading, Button, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import { useGroup } from "context";
import { Group } from "models";
import { useColorScheme } from "theme";
import { ConfirmButton } from "components/common";
import { GroupInfo } from "./GroupInfo";

interface GroupSettingsProps {
  group: Group;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const { deleteGroup } = useGroup();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>{group.name} - Settings</Heading>
      <GroupInfo group={group} isEditingState={[isEditing, setIsEditing]} />
      {!isEditing ? (
        <>
          <Button onClick={() => setIsEditing(true)}>Edit Group Info</Button>
          <Button onClick={() => history.push(`/groups/${group.id}/members`)}>
            Group Members
          </Button>
          <Formik
            initialValues={{}}
            onSubmit={async () => {
              const success = await deleteGroup(group.id);
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
                  popoverText="Are you sure you want to delete this group? This action cannot be undone."
                  confirmText="Yes, Delete Group"
                >
                  Delete Group
                </ConfirmButton>
              </Form>
            )}
          </Formik>
        </>
      ) : null}
    </Stack>
  );
};
