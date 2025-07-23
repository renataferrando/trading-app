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
import { TradeWithNumericPrices } from "@/lib/types";
import { DatePicker } from "../date-picker";
import { tradeFormSchema } from "./schemas/trade-form";

export function TradeForm({
  portfolioId,
  initialData,
  onClose,
}: {
  portfolioId: number;
  initialData?: TradeWithNumericPrices;
  onClose?: () => void;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof tradeFormSchema>>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      ticker: initialData?.ticker || "",
      entryPrice: initialData?.entryPrice || 0,
      exitPrice: initialData?.exitPrice || 0,
      quantity: initialData?.quantity || 1,
      date: initialData?.date ? new Date(initialData.date) : undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof tradeFormSchema>) {
    try {
      const url = initialData
        ? `/api/portfolios/${portfolioId}/trades/${initialData.id}`
        : `/api/portfolios/${portfolioId}/trades`;
      const method = initialData ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success(
        `Trade ${initialData ? "updated" : "created"} successfully!`
      );
      router.refresh();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  async function onDelete() {
    try {
      if (!initialData) return;

      const response = await fetch(
        `/api/portfolios/${portfolioId}/trades/${initialData.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      toast.success("Trade deleted successfully!");
      router.refresh();
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="ticker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ticker</FormLabel>
              <FormControl>
                <Input placeholder="e.g. AAPL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="entryPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 150.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="exitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exit Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 175.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 10"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <DatePicker
                date={field.value}
                setDate={field.onChange}
                disabled={{ after: new Date() }}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit">
            {initialData ? "Save Changes" : "Add Trade"}
          </Button>
          {initialData && (
            <Button type="button" variant="destructive" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
