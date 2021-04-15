import * as Yup from "yup";

export const type = Yup.string().required("Required");
export const question = Yup.string()
  .required("Required")
  .min(5, "Question must be a minimum of 5 characters")
  .max(500, "Question must be a maximum of 500 characters");
export const answerIndex = Yup.mixed()
  .required("Required")
  .test("is-populated", "Required", (value) => value?.length > 0);
export const options = Yup.array().of(Yup.string().required("Required"));
