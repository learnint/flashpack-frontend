import React, { useState } from "react";
import { Button, Stack, Heading, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "auth";
import { FormInput } from "components/common";
import { useLocationState } from "router";
import { useColorScheme } from "theme";
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
} from "validations/User";

export const CreateAccount: React.FC = () => {
  const history = useHistory();
  const { from } = useLocationState();
  const colorScheme = useColorScheme();
  const { createAccount } = useAuth();

  const isShownState = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>Create Account</Heading>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        })}
        onSubmit={async (values) => {
          const success = await createAccount(values);
          if (success) {
            history.replace("/login", { from: from });
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <FormInput
              name="firstName"
              label="First Name"
              placeholder="John"
              error={errors.firstName}
              touched={touched.firstName}
            />
            <FormInput
              name="lastName"
              label="Last Name"
              placeholder="Smith"
              error={errors.lastName}
              touched={touched.lastName}
            />
            <FormInput
              name="email"
              label="Email"
              placeholder="example@address.com"
              type="email"
              error={errors.email}
              touched={touched.email}
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Enter password"
              type="password"
              isShownState={isShownState}
              error={errors.password}
              touched={touched.password}
            />
            <FormInput
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              isShownState={isShownState}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            <Button type="submit" isLoading={isSubmitting} w="full" mt="2">
              Create Account
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        as={RouterLink}
        to={{
          pathname: "/login",
          state: { from: from },
        }}
        replace
      >
        Already have an account? Login
      </Link>
    </Stack>
  );
};
