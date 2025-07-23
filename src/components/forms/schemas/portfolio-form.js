import { z } from "zod";

export const portfolioFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  initialValue: z.coerce
    .number()
    .min(1, { message: "Initial value is required" }),
});
