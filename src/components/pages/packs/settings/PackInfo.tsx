import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { usePack } from "context";
import { FormInput } from "components/common";
import { Pack, State } from "models";
import { name, description } from "validations/Pack";

interface PackInfoProps {
  pack: Pack;
  isEditingState: State<boolean>;
}

export const PackInfo: React.FC<PackInfoProps> = ({ pack, isEditingState }) => {
  const { updatePack } = usePack();

  const [isEditing, setIsEditing] = isEditingState;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: pack.name,
        description: pack.description || "",
      }}
      validationSchema={Yup.object({ name, description })}
      onSubmit={async (values) => {
        const success = await updatePack({ id: pack.id, body: values });
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
                Save Pack Info
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
