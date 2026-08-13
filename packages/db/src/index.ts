/**
 * Importable Prisma client entrypoint for @taskflow/db.
 *
 * Usage:
 *   import { prisma } from "@taskflow/db";
 *   const users = await prisma.user.findMany();
 */
export { PrismaClient } from "@prisma/client";

import { PrismaClient } from "@prisma/client";

// Singleton pattern: reuse the same client across hot-reloads in dev.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
