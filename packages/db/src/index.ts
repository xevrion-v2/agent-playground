import { PrismaClient } from "@prisma/client";

/**
 * A singleton PrismaClient instance for the TaskFlow database package.
 *
 * Reusing a single instance across the application prevents exhausting
 * database connections in development and serverless environments.
 */
export const prisma = new PrismaClient();

export { PrismaClient };
export * from "@prisma/client";
