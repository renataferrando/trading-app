"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

export function PortfolioForm({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof portfolioFormSchema>>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      name: "",
      initialValue: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof portfolioFormSchema>) {
    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Portfolio created successfully!");
      onClose();
      router.refresh();
      form.reset();
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 10000"
                  {...field}
                  {...form.register("initialValue", { valueAsNumber: true })}
                />
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
