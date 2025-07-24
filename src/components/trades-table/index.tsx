"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TradeWithNumericPrices } from "@/lib/types";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { EditTradeSheet } from "@/components/edit-trade-sheet";

export function TradesTable({ trades }: { trades: TradeWithNumericPrices[] }) {
  return (
    <div className="rounded-md border bg-gray-800 bg-opacity-40">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold">Ticker</TableHead>
            <TableHead className="text-center font-bold">Date</TableHead>
            <TableHead className="text-center font-bold">Quantity</TableHead>
            <TableHead className="text-center font-bold">Entry Price</TableHead>
            <TableHead className="text-center font-bold">Exit Price</TableHead>
            <TableHead className="text-center font-bold">Gain/Loss</TableHead>
            <TableHead className="text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No trades in this portfolio yet.
              </TableCell>
            </TableRow>
          ) : (
            trades.map((trade) => {
              const gainLoss =
                ((trade.exitPrice - trade.entryPrice) / trade.entryPrice) * 100;
              const isGain = gainLoss >= 0;

              return (
                <TableRow key={trade.id}>
                  <TableCell className="text-center font-bold">
                    {trade.ticker}
                  </TableCell>
                  <TableCell className="text-center">
                    {new Date(trade.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {trade.quantity}
                  </TableCell>
                  <TableCell className="text-center">
                    ${trade.entryPrice.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    ${trade.exitPrice.toLocaleString()}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center",
                      isGain ? "text-green-500" : "text-red-500"
                    )}
                  >
                    <div className="flex items-center justify-center">
                      {isGain ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {gainLoss.toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <EditTradeSheet trade={trade} />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
