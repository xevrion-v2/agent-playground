import { vi } from "vitest";

class MockPrismaClient {
  user = {
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  };
}

vi.mock("@prisma/client", () => ({
  PrismaClient: MockPrismaClient,
  User: {},
}));