import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // clear out any existing
  await prisma.portfolio.deleteMany();

  // build 10 portfolios
  const portfolios = Array.from({ length: 10 }, (_, i) => ({
    name: `Portfolio ${i + 1}`,
    initialValue: 10000 + i * 500,
  }));

  const { count } = await prisma.portfolio.createMany({
    data: portfolios,
    skipDuplicates: true,
  });
  console.log(`🌱 Seeded ${count} portfolios.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
