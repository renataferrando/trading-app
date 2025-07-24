import * as yup from "yup";

export const tradeFormSchema = yup.object().shape({
  ticker: yup.string().required("Ticker is required"),
  entryPrice: yup
    .number()
    .required("Entry price is required")
    .positive("Entry price must be greater than 0"),
  exitPrice: yup
    .number()
    .required("Exit price is required")
    .positive("Exit price must be greater than 0"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  date: yup.date().required("A date is required."),
});
