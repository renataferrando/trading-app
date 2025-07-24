import * as yup from "yup";

export const portfolioFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  initialValue: yup
    .number()
    .required("Initial value is required")
    .min(1, "Initial value must be at least 1"),
});
