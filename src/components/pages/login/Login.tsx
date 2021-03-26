import React, { useState } from "react";
import { Button, Heading, Link, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useLocationState } from "router";
import * as Yup from "yup";
import { useAuth } from "auth";
import { FormInput } from "components/common";
import { useColorScheme } from "theme";
import { email, password } from "validations";

export const Login: React.FC = () => {
  const history = useHistory();
  const { from } = useLocationState();
  const { login } = useAuth();
  const colorScheme = useColorScheme();

  const isShownState = useState<boolean>(false);

  return (
    <Stack w="full" maxW="container.sm">
      <Heading color={colorScheme}>Login</Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({ email, password })}
        onSubmit={async (values) => {
          const success = await login(values);
          if (success) {
            history.replace(from);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
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
            <Button type="submit" isLoading={isSubmitting} w="full" mt="2">
              Login
            </Button>
          </Form>
        )}
      </Formik>
      <Link
        as={RouterLink}
        to={{
          pathname: "/createAccount",
          state: { from: from },
        }}
        replace
      >
        Create Account
      </Link>
    </Stack>
  );
};
