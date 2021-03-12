import React, { useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useLocationState } from "router";
import * as Yup from "yup";
import { useAuth } from "auth";
import { FormInput } from "components/common";
import { email, password } from "validations";

export const Login: React.FC = () => {
  const history = useHistory();
  const { from } = useLocationState();
  const auth = useAuth();

  const isShownState = useState<boolean>(false);

  return (
    <Flex w="full" maxW="container.sm" direction="column">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({ email, password })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            auth.login(() => history.replace(from));
            actions.setSubmitting(false);
          }, 1000);
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
        to={{
          pathname: "/createAccount",
          state: { from: from },
        }}
        replace
      >
        Create Account
      </Link>
    </Flex>
  );
};
