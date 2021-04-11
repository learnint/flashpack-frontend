import React from "react";
import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { usePack } from "context";
import { FormInput } from "components/common";
import { useColorScheme } from "theme";
import { Group } from "models";
import { name, description } from "validations/Pack";

interface CreatePackProps {
  group: Group | undefined;
}

export const CreatePack: React.FC<CreatePackProps> = ({ group }) => {
  const history = useHistory();
  const colorScheme = useColorScheme();
  const { createPack } = usePack();

  const packsPath = group ? `/groups/${group.id}/packs` : "/packs";

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>
        {group ? `${group.name} -` : null} Create Pack
      </Heading>
      <Formik
        initialValues={{
          name: "",
          description: "",
        }}
        validationSchema={Yup.object({ name, description })}
        onSubmit={async (values) => {
          const success = await createPack({
            groupId: group?.id,
            body: values,
          });
          if (success) {
            history.push(packsPath);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormInput
              name="name"
              label="Name"
              placeholder="Pack Name"
              error={errors.name}
              touched={touched.name}
            />
            <FormInput
              name="description"
              label="Description"
              placeholder="Information about the pack"
              type="textarea"
              error={errors.description}
              touched={touched.description}
            />
            <Flex mt="2">
              <Button type="submit" isLoading={isSubmitting} mr="2" flex="auto">
                Create Pack
              </Button>
              <Button
                onClick={() => history.push(packsPath)}
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
