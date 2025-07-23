-- CreateTable
CREATE TABLE "PortfolioHistory" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "totalValue" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PortfolioHistory_pkey" PRIMARY KEY ("id")
);
