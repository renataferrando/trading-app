"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { TradeForm } from "../forms/trade-form";
import { TradeWithNumericPrices } from "@/lib/types";

export function EditTradeSheet({ trade }: { trade: TradeWithNumericPrices }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Trade</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <TradeForm
            initialData={trade}
            portfolioId={trade.portfolioId}
            onClose={handleClose}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
