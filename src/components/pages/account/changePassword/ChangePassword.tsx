import React, { useState } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useUser } from "context";
import { FormInput } from "components/common";
import { oldPassword, newPassword, confirmNewPassword } from "validations";

export const ChangePassword: React.FC = () => {
  const history = useHistory();

  const { changePassword } = useUser();

  const isShownState = useState<boolean>(false);

  return (
    <Formik
      initialValues={{
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      }}
      validationSchema={Yup.object({
        oldPassword,
        newPassword,
        confirmNewPassword,
      })}
      onSubmit={async (values) => {
        const success = await changePassword(values);
        if (success) {
          history.push("/account");
        }
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <FormInput
            name="oldPassword"
            label="Change Password"
            placeholder="Enter old password"
            type="password"
            isShownState={isShownState}
            error={errors.oldPassword}
            touched={touched.oldPassword}
          />
          <FormInput
            name="newPassword"
            placeholder="Enter new password"
            type="password"
            isShownState={isShownState}
            error={errors.newPassword}
            touched={touched.newPassword}
          />
          <FormInput
            name="confirmNewPassword"
            placeholder="Confirm new password"
            type="password"
            isShownState={isShownState}
            error={errors.confirmNewPassword}
            touched={touched.confirmNewPassword}
          />
          <Flex mt="2">
            <Button type="submit" isLoading={isSubmitting} mr="2" flex="auto">
              Change Password
            </Button>
            <Button
              onClick={() => history.push("/account")}
              isDisabled={isSubmitting}
              flex="auto"
            >
              Cancel
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};
