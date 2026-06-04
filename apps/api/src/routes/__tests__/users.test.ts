import { describe, it, expect } from "vitest";
import express from "express";
import usersRouter from "../routes/users";

describe("users router", () => {
  it("is a valid Express Router", () => {
    expect(usersRouter).toBeDefined();
    expect(typeof usersRouter).toBe("function");
  });

  it("can be mounted on an Express app", () => {
    const app = express();
    app.use(express.json());
    expect(() => {
      app.use("/users", usersRouter);
    }).not.toThrow();
  });

  it("has route handlers registered (stack is non-empty)", () => {
    // Express Router stores routes in `stack`
    expect((usersRouter as any).stack).toBeDefined();
    expect((usersRouter as any).stack.length).toBeGreaterThan(0);
  });
});
