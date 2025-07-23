"use client";

import { useState } from "react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { TradeForm } from "../forms/trade-form";
import { Button } from "@/components/ui/button";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function PortfolioCard({
  portfolioId,
  name,
  initialValue,
  currentValue,
  pnl,
}: {
  portfolioId: number;
  name: string;
  initialValue: number;
  currentValue?: number;
  pnl: number[];
}) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  const totalPnl = pnl.reduce((acc, curr) => acc + curr, 0);
  const chartColor = totalPnl >= 0 ? "rgb(75, 192, 192)" : "rgb(255, 99, 132)";
  const chartBorderColor =
    totalPnl >= 0 ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 99, 132, 0.2)";

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "P&L",
        data: pnl,
        fill: false,
        backgroundColor: chartColor,
        borderColor: chartBorderColor,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Portfolio P&L",
      },
    },
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <Link href={`/portfolio/${portfolioId}`}>
        <div className="border rounded-lg p-4 h-80 flex flex-col gap-4 bg-gray-900 bg-opacity-40 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setIsSheetOpen(true);
                }}
              >
                <Plus className="h-5 w-5" />
              </Button>
            </SheetTrigger>
          </div>
          <div>
            <div className="mt-2">
              <p>Initial Value: ${initialValue.toLocaleString()}</p>
              <p>
                Current Value:{" "}
                {currentValue ? `$${currentValue.toLocaleString()}` : "-"}
              </p>
            </div>
          </div>
          <div className="mt-4">
            {pnl && pnl.length > 0 ? (
              <Line data={data} options={options} />
            ) : (
              <div className="p-6 bg-gray-800 h-full rounded-md flex justify-center items-center h-full">
                <p>No trades in this portfolio.</p>
              </div>
            )}
          </div>
        </div>
      </Link>
      <SheetContent className="p-4">
        <SheetHeader>
          <SheetTitle>Add a new trade to {name}</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <TradeForm portfolioId={portfolioId} onClose={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
