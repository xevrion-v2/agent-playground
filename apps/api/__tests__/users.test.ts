import { describe, it, expect, vi } from "vitest";

// Mock express router
const mockRouter = { get: vi.fn(), post: vi.fn() };
vi.mock("express", () => ({ Router: () => mockRouter }));

describe("User routes", () => {
  it("registers GET / handler", async () => {
    const { default: router } = await import("../src/routes/users");
    expect(mockRouter.get).toHaveBeenCalledWith("/", expect.any(Function));
  });

  it("registers POST / handler", async () => {
    const { default: router } = await import("../src/routes/users");
    expect(mockRouter.post).toHaveBeenCalledWith("/", expect.any(Function));
  });

  it("GET / returns empty array", async () => {
    const { default: router } = await import("../src/routes/users");
    const getHandler = mockRouter.get.mock.calls.find((c: any[]) => c[0] === "/")?.[1];
    const req = {} as any;
    const res = { json: vi.fn() } as any;
    getHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: [] })
    );
  });

  it("POST / returns created stub with 201", async () => {
    const { default: router } = await import("../src/routes/users");
    const postHandler = mockRouter.post.mock.calls.find((c: any[]) => c[0] === "/")?.[1];
    const req = { body: { name: "Test" } } as any;
    const res = { status: vi.fn().mockReturnThis(), json: vi.fn() } as any;
    postHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ id: "stub-user-id" }) })
    );
  });
});
