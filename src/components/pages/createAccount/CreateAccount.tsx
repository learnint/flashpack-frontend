import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "auth";
import { FormInput } from "components/common";
import { useLocationState } from "router";
import {
  confirmPassword,
  email,
  firstName,
  lastName,
  password,
} from "validations";

export const CreateAccount: React.FC = () => {
  const { from } = useLocationState();
  const auth = useAuth();

  const isShownState = useState<boolean>(false);

  return (
    <Flex w="full" maxW="container.sm" direction="column">
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
          await auth.login(values.email, values.password);
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
        to={{
          pathname: "/login",
          state: { from: from },
        }}
        replace
      >
        Already have an account? Login
      </Link>
    </Flex>
  );
};
