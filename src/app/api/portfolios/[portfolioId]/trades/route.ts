import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { portfolioId: string } }
) {
  const portfolioId = Number(params.portfolioId);
  const trades = await prisma.trade.findMany({
    where: { portfolioId },
    orderBy: { date: "asc" },
  });
  return NextResponse.json(trades);
}

export async function POST(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const { portfolioId } = params;
    const { ticker, entryPrice, exitPrice, quantity, date } = await req.json();

    if (!ticker || !entryPrice || !exitPrice || !quantity || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const trade = await prisma.trade.create({
      data: {
        portfolioId: parseInt(portfolioId),
        ticker,
        entryPrice,
        exitPrice,
        quantity,
        date: new Date(date),
      },
    });

    return NextResponse.json(trade);
  } catch (error) {
    console.error("[TRADES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
