import * as Yup from "yup";

export const firstName = Yup.string()
  .min(3, "First name must be a minimum of 3 characters")
  .max(30, "First name must be a maximum of 30 characters")
  .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "First name cannot contain numbers")
  .required("Required");

export const lastName = Yup.string()
  .min(3, "Last name must be a minimum of 3 characters")
  .max(30, "Last name must be a maximum of 30 characters")
  .matches(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/, "Last name cannot contain numbers")
  .required("Required");

export const email = Yup.string()
  .email("Invalid email address")
  .max(70, "Email must be a maximum of 70 characters")
  .required("Required");

export const password = Yup.string()
  .min(6, "Password must be a minimum of 6 characters")
  .max(30, "Password must be a maximum of 30 characters")
  .required("Required");

export const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password")], "Passwords do not match")
  .required("Required");

export const oldPassword = Yup.string()
  .min(6, "Old password must be a minimum of 6 characters")
  .max(30, "Old password must be a maximum of 30 characters")
  .required("Required");

export const newPassword = Yup.string()
  .min(6, "New password must be a minimum of 6 characters")
  .max(30, "New password must be a maximum of 30 characters")
  .notOneOf(
    [Yup.ref("oldPassword")],
    "New password cannot be the same as old password"
  )
  .required("Required");

export const confirmNewPassword = Yup.string()
  .oneOf([Yup.ref("newPassword")], "New passwords do not match")
  .required("Required");
