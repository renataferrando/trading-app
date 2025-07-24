import { prisma } from "@/lib/prisma";
import { TradesTable } from "@/components/trades-table";
import { notFound } from "next/navigation";
import PageWrapper from "@/components/page";
import Header from "@/components/header";
import { AddTradeButton } from "@/components/add-trade-button";
import { getPortfolioById } from "@/lib/portfolios";
import { DeletePortfolioButton } from "@/components/delete-portfolio-btn";
import { PortfolioSummary } from "@/components/portfolio-summary";

export default async function PortfolioPage({
  params,
}: {
  params: { portfolioId: string };
}) {
  const portfolio = await getPortfolioById(parseInt(params.portfolioId));

  if (!portfolio) {
    notFound();
  }

  const trades = await prisma.trade.findMany({
    where: {
      portfolioId: parseInt(params.portfolioId),
    },
  });

  const tradesWithNumericPrices = trades.map((trade) => ({
    ...trade,
    entryPrice: Number(trade.entryPrice),
    exitPrice: Number(trade.exitPrice),
  }));

  return (
    <PageWrapper
      header={
        <Header
          title={portfolio.name}
          navItems={[]}
          button={
            <div className="flex items-center gap-4">
              <AddTradeButton portfolioId={portfolio.id} />
              <DeletePortfolioButton portfolioId={portfolio.id} />
            </div>
          }
        />
      }
    >
      <PortfolioSummary
        initialValue={portfolio.initialValue}
        currentValue={portfolio.currentValue}
        pnl={portfolio.pnl ?? []}
        tradeDates={portfolio.tradeDates ?? []}
      />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Trades</h2>
        <TradesTable trades={tradesWithNumericPrices} />
      </div>
    </PageWrapper>
  );
}
