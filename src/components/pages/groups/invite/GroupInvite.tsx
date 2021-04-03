import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useGroup } from "context";
import { FormInput } from "components/common";
import { Group } from "models";
import { useColorScheme } from "theme";
import { emails } from "validations";

interface GroupInviteProps {
  group: Group;
}

export const GroupInvite: React.FC<GroupInviteProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const { inviteGroupUsers } = useGroup();

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>Invite Members</Heading>
      <Formik
        initialValues={{
          emails: "",
        }}
        validationSchema={Yup.object({ emails })}
        onSubmit={async (values) => {
          const success = await inviteGroupUsers({
            id: group.id,
            body: { emails: values.emails.replace(/\s/g, "").split(",") },
          });
          if (success) {
            history.push(`/groups/${group.id}/members`);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormInput
              name="emails"
              label="Emails"
              placeholder="john@example.com, jill@example.com, jack@example.com"
              helperText="User emails seperated by commas"
              type="textarea"
              error={errors.emails}
              touched={touched.emails}
            />
            <Flex mt="2">
              <Button type="submit" isLoading={isSubmitting} mr="2" flex="auto">
                Invite Members
              </Button>
              <Button
                onClick={() => history.push(`/groups/${group.id}/members`)}
                isDisabled={isSubmitting}
                flex="auto"
              >
                Cancel
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
