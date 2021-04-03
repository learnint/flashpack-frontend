import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useGroup } from "context";
import { FormInput } from "components/common";
import { useColorScheme } from "theme";
import { name, description } from "validations";

export const CreateGroup: React.FC = () => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const { createGroup } = useGroup();

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>Create Group</Heading>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={Yup.object({ name, description })}
        onSubmit={async (values) => {
          const success = await createGroup(values);
          if (success) {
            history.push("/groups");
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormInput
              name="name"
              label="Name"
              placeholder="Group Name"
              error={errors.name}
              touched={touched.name}
            />
            <FormInput
              name="description"
              label="Description"
              placeholder="Information about the group"
              type="textarea"
              error={errors.description}
              touched={touched.description}
            />
            <Flex mt="2">
              <Button type="submit" isLoading={isSubmitting} mr="2" flex="auto">
                Create Group
              </Button>
              <Button
                onClick={() => history.push("/groups")}
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
