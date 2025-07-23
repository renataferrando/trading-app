import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.trade.deleteMany();
  await prisma.portfolio.deleteMany();

  // Create 10 portfolios
  for (let i = 1; i <= 10; i++) {
    const portfolio = await prisma.portfolio.create({
      data: {
        name: `Portfolio ${i}`,
        initialValue: 10000 + i * 1000,
      },
    });

    // Add trades to all portfolios except the last one
    if (i < 10) {
      const numTrades = Math.floor(Math.random() * 5) + 1; // 1 to 5 trades
      for (let j = 0; j < numTrades; j++) {
        await prisma.trade.create({
          data: {
            portfolioId: portfolio.id,
            ticker: ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA"][
              Math.floor(Math.random() * 5)
            ],
            entryPrice: Math.random() * 200 + 100,
            exitPrice: Math.random() * 200 + 100,
            quantity: Math.floor(Math.random() * 100) + 1,
            date: new Date(
              new Date().getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
            ),
          },
        });
      }
    }
  }
  console.log("🌱 Database seeded with 10 portfolios and trades.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
