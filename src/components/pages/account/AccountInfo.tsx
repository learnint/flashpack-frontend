import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useUser } from "context";
import { FormInput } from "components/common";
import { State } from "models";
import { email, firstName, lastName } from "validations";

interface AccountInfoProps {
  isEditingState: State<boolean>;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ isEditingState }) => {
  const { user, isUserLoading, updateUser } = useUser();

  const [isEditing, setIsEditing] = isEditingState;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
      }}
      validationSchema={Yup.object({
        firstName,
        lastName,
        email,
      })}
      onSubmit={async (values) => {
        const success = await updateUser(values);
        if (success) {
          setIsEditing(false);
        }
      }}
      onReset={() => setIsEditing(false)}
    >
      {({ isSubmitting, errors, touched, dirty }) => (
        <Form>
          <FormInput
            name="firstName"
            label="First Name"
            isDisabled={!isEditing}
            isLoading={isUserLoading}
            error={errors.firstName}
            touched={touched.firstName}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            isDisabled={!isEditing}
            isLoading={isUserLoading}
            error={errors.lastName}
            touched={touched.lastName}
          />
          <FormInput
            name="email"
            label="Email"
            type="email"
            isDisabled={!isEditing}
            isLoading={isUserLoading}
            error={errors.email}
            touched={touched.email}
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
                Save Account Info
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
