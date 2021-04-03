import * as Yup from "yup";

export const name = Yup.string().required("Required");
export const description = Yup.string();
export const emails = Yup.string().required("Required");
