import React from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Group } from "models";
import { FormInput } from "components/common";
import { useColorScheme } from "theme";

interface GroupSettingsProps {
  group: Group;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();

  return (
    <>
      <Heading color={colorScheme}>Group Settings</Heading>
      <Formik
        enableReinitialize
        initialValues={{
          name: group.name,
          description: group.description || "",
        }}
        validationSchema={Yup.object({})}
        onSubmit={async (values) => {
          // TODO
        }}
      >
        {({ isSubmitting, errors, touched, dirty }) => (
          <Form>
            <FormInput
              name="name"
              label="Name"
              error={errors.name}
              touched={touched.name}
            />
            <FormInput
              name="description"
              label="Description"
              error={errors.description}
              touched={touched.description}
            />
            <Flex mt="2">
              <Button
                type="submit"
                isLoading={isSubmitting}
                isDisabled={!dirty}
                mr="2"
                flex="auto"
              >
                Save Group Info
              </Button>
              <Button
                onClick={() => history.push(`/groups/${group.id}`)}
                isDisabled={isSubmitting}
                flex="auto"
              >
                Cancel
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </>
  );
};
