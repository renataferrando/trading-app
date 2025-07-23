import { Trade } from "@prisma/client";

export type TradeWithNumericPrices = Omit<Trade, "entryPrice" | "exitPrice"> & {
  entryPrice: number;
  exitPrice: number;
};
