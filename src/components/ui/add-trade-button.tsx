"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { TradeForm } from "../forms/trade-form";

export function AddTradeButton({ portfolioId }: { portfolioId: number }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button>Add Trade</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add a new trade</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <TradeForm portfolioId={portfolioId} onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
