import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const portfolio = await prisma.portfolio.findUnique({ where: { id } });
  if (!portfolio) {
    return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
  }
  return NextResponse.json(portfolio);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { name, initialValue } = await request.json();
  const updated = await prisma.portfolio.update({
    where: { id },
    data: { name, initialValue },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const { portfolioId } = params;

    await prisma.trade.deleteMany({
      where: {
        portfolioId: parseInt(portfolioId),
      },
    });

    const portfolio = await prisma.portfolio.delete({
      where: {
        id: parseInt(portfolioId),
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("[PORTFOLIO_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
