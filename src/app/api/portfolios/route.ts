import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const portfolios = await prisma.portfolio.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(portfolios);
}

export async function POST(req: Request) {
  try {
    const { name, initialValue } = await req.json();

    if (!name || !initialValue) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        name,
        initialValue,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("[PORTFOLIOS_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
