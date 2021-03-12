import * as Yup from "yup";

export const firstName = Yup.string().required("Required");

export const lastName = Yup.string().required("Required");

export const email = Yup.string()
  .email("Invalid email address")
  .required("Required");

export const password = Yup.string().required("Required");

export const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords do not match")
  .required("Required");

export const oldPassword = Yup.string().required("Required");

export const newPassword = Yup.string().required("Required");

export const confirmNewPassword = Yup.string()
  .oneOf([Yup.ref("newPassword")], "New passwords do not match")
  .required("Required");
