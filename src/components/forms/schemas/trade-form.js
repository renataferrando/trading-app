import { z } from "zod";
export const tradeFormSchema = z.object({
  ticker: z.string().min(1, { message: "Ticker is required" }),
  entryPrice: z.coerce
    .number()
    .gt(0, { message: "Entry price must be greater than 0" }),
  exitPrice: z.coerce
    .number()
    .gt(0, { message: "Exit price must be greater than 0" }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, { message: "Quantity must be at least 1" }),
  date: z.date({
    message: "A date is required.",
  }),
});
