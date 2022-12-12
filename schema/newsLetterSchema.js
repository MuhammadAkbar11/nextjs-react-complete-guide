import * as yup from "yup";

export const postNewsLetterSchema = yup.object({
  email: yup.string().required("email is required").email(),
});
