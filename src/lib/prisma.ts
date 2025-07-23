import { PrismaClient } from "@prisma/client";

declare global {
  // allow global `var` in dev to prevent multiple instances
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
