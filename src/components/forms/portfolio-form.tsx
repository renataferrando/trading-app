"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { portfolioFormSchema } from "./schemas/portfolio-form";

type FormValues = yup.InferType<typeof portfolioFormSchema>;

export function PortfolioForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: yupResolver(portfolioFormSchema),
    defaultValues: { name: "", initialValue: 0 },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error("Something went wrong");
      toast.success("Portfolio created!");
      form.reset();
      onClose();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Tech Stocks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="initialValue"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Initial Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 10000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Portfolio</Button>
      </form>
    </Form>
  );
}
