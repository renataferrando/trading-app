"use client";

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
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function PortfolioSummary({
  initialValue,
  currentValue,
  pnl,
  tradeDates = [],
}: {
  initialValue: number;
  currentValue?: number;
  pnl: number[];
  tradeDates?: Date[];
}) {
  const totalPnl = pnl.length > 0 ? pnl[pnl.length - 1] : 0;
  const chartColor = totalPnl >= 0 ? "rgb(75, 192, 192)" : "rgb(255, 99, 132)";
  const chartBorderColor =
    totalPnl >= 0 ? "rgba(75, 192, 192, 0.2)" : "rgba(255, 99, 132, 0.2)";
  const labels =
    tradeDates.length === pnl.length
      ? tradeDates.map((date) => format(new Date(date), "MMM yyyy"))
      : pnl.map((_, i) => `Trade ${i + 1}`);
  const data = {
    labels,
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
    <div className="mb-8 py-6 px-8 bg-gray-900 rounded-lg shadow flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold text-white w-full text-center md:text-left md:col-span-2">
          Portfolio Summary
        </h3>
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
        <div className="flex flex-col gap-4 md:w-1/3">
          <div>
            <div className="text-sm text-gray-400">Initial Value</div>
            <div className="font-bold text-lg">
              ${initialValue.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Current Value</div>
            <div className="font-bold text-lg">
              {currentValue !== undefined
                ? `$${currentValue.toLocaleString()}`
                : "-"}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Cumulative PnL</div>
            <div
              className={`font-bold text-lg ${
                totalPnl >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${" "}
              {totalPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
        </div>
        <div className="w-full h-56 md:w-2/3">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
