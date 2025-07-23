import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { portfolioId: string; tradeId: string } }
) {
  const id = Number(params.tradeId);
  const trade = await prisma.trade.findUnique({ where: { id } });
  if (!trade) return NextResponse.notFound();
  return NextResponse.json(trade);
}

export async function PATCH(
  req: Request,
  { params }: { params: { tradeId: string } }
) {
  try {
    const { tradeId } = params;
    const { ticker, entryPrice, exitPrice, quantity, date } = await req.json();

    if (!ticker || !entryPrice || !exitPrice || !quantity || !date) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const trade = await prisma.trade.update({
      where: {
        id: parseInt(tradeId),
      },
      data: {
        ticker,
        entryPrice,
        exitPrice,
        quantity,
        date: new Date(date),
      },
    });

    return NextResponse.json(trade);
  } catch (error) {
    console.error("[TRADE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { tradeId: string } }
) {
  try {
    const { tradeId } = params;

    const trade = await prisma.trade.delete({
      where: {
        id: parseInt(tradeId),
      },
    });

    return NextResponse.json(trade);
  } catch (error) {
    console.error("[TRADE_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
