import * as yup from "yup";

export const postCommentSchema = yup.object({
  email: yup.string().required("email is required").email(),
  name: yup.string().required("name is required"),
  text: yup.string().required("text is required"),
});
