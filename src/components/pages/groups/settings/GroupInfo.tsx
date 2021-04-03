import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useGroup } from "context";
import { FormInput } from "components/common";
import { Group, State } from "models";
import { name, description } from "validations";

interface GroupInfoProps {
  group: Group;
  isEditingState: State<boolean>;
}

export const GroupInfo: React.FC<GroupInfoProps> = ({
  group,
  isEditingState,
}) => {
  const { updateGroup } = useGroup();

  const [isEditing, setIsEditing] = isEditingState;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: group.name,
        description: group.description || "",
      }}
      validationSchema={Yup.object({ name, description })}
      onSubmit={async (values) => {
        const success = await updateGroup({ id: group.id, body: values });
        if (success) {
          setIsEditing(false);
        }
      }}
      onReset={() => setIsEditing(false)}
    >
      {({ isSubmitting, errors, touched, dirty }) => (
        <Form>
          <FormInput
            name="name"
            label="Name"
            isDisabled={!isEditing}
            error={errors.name}
            touched={touched.name}
          />
          <FormInput
            name="description"
            label="Description"
            type="textarea"
            isDisabled={!isEditing}
            error={errors.description}
            touched={touched.description}
          />
          {isEditing ? (
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
              <Button type="reset" isDisabled={isSubmitting} flex="auto">
                Cancel
              </Button>
            </Flex>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};
