import * as Yup from "yup";

export const email = Yup.string()
  .email("Invalid email address")
  .required("Required");

export const password = Yup.string().required("Required");

export const firstName = Yup.string().required("Required");

export const lastName = Yup.string().required("Required");
