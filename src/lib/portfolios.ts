// src/lib/portfolios.ts
import { prisma } from "./prisma";
import Decimal from "decimal.js";

export type PortfolioWithPnl = {
  id: number;
  name: string;
  initialValue: number;
  tradeCount: number;
  pnl?: number[];
  currentValue?: number;
};

export async function getPortfolioById(
  id: number
): Promise<PortfolioWithPnl | null> {
  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
    include: {
      trades: {
        select: {
          entryPrice: true,
          exitPrice: true,
          quantity: true,
          date: true,
        },
      },
    },
  });

  if (!portfolio) {
    return null;
  }

  // This is mock data for now
  // gain/loss calculation is based on the exitPrice of the trade insted of current market price.

  const initial = new Decimal(portfolio.initialValue.toString());
  if (portfolio.trades.length === 0) {
    return {
      id: portfolio.id,
      name: portfolio.name,
      initialValue: initial.toNumber(),
      tradeCount: 0,
    };
  }

  let running = new Decimal(0);
  const pnlSeries = [...portfolio.trades]
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((t) => {
      const profit = new Decimal(t.exitPrice.toString())
        .minus(new Decimal(t.entryPrice.toString()))
        .times(t.quantity);
      running = running.plus(profit);
      return running.toNumber();
    });

  return {
    id: portfolio.id,
    name: portfolio.name,
    initialValue: initial.toNumber(),
    tradeCount: portfolio.trades.length,
    pnl: pnlSeries,
    currentValue: initial.plus(running).toNumber(),
  };
}

export async function getPortfoliosWithPnl(): Promise<PortfolioWithPnl[]> {
  const raw = await prisma.portfolio.findMany({
    include: {
      trades: {
        select: {
          entryPrice: true,
          exitPrice: true,
          quantity: true,
          date: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return raw.map((p) => {
    const initial = new Decimal(p.initialValue.toString());
    if (p.trades.length === 0) {
      return {
        id: p.id,
        name: p.name,
        initialValue: initial.toNumber(),
        tradeCount: 0,
      };
    }

    // build cumulative PnL series
    let running = new Decimal(0);
    const pnlSeries = [...p.trades]
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map((t) => {
        const profit = new Decimal(t.exitPrice.toString())
          .minus(new Decimal(t.entryPrice.toString()))
          .times(t.quantity);
        running = running.plus(profit);
        return running.toNumber();
      });

    return {
      id: p.id,
      name: p.name,
      initialValue: initial.toNumber(),
      tradeCount: p.trades.length,
      pnl: pnlSeries,
      currentValue: initial.plus(running).toNumber(),
    };
  });
}
