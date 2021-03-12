import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "components/common";
import { State } from "models";
import { email, firstName, lastName } from "validations";

interface AccountInfoProps {
  isEditingState: State<boolean>;
}

export const AccountInfo: React.FC<AccountInfoProps> = ({ isEditingState }) => {
  const [isEditing, setIsEditing] = isEditingState;

  return (
    <Formik
      initialValues={{
        firstName: "Jarod",
        lastName: "Burchill",
        email: "jburchill3780@conestogac.on.ca",
      }}
      validationSchema={Yup.object({
        firstName,
        lastName,
        email,
      })}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          setIsEditing(false);
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      onReset={() => setIsEditing(false)}
    >
      {({ isSubmitting, errors, touched, dirty }) => (
        <Form>
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="John"
            isDisabled={!isEditing}
            error={errors.firstName}
            touched={touched.firstName}
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Smith"
            isDisabled={!isEditing}
            error={errors.lastName}
            touched={touched.lastName}
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="example@address.com"
            type="email"
            isDisabled={!isEditing}
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
