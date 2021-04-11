import * as Yup from "yup";

export const name = Yup.string()
  .required("Required")
  .min(3, "Name must be a minimum of 3 characters")
  .max(20, "Name must be a maximum of 20 characters");

export const description = Yup.string().max(
  100,
  "Description must be a maximum of 100 characters"
);
