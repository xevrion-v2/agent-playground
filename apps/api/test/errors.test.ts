import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
import { ApiError, sendError } from "../src/utils/errors.js";

describe("ApiError", () => {
  it("creates a bad request error (400)", () => {
    const err = ApiError.badRequest("Invalid input");
    expect(err.status).toBe(400);
    expect(err.message).toBe("Invalid input");
  });

  it("creates a not found error (404)", () => {
    const err = ApiError.notFound("User not found");
    expect(err.status).toBe(404);
    expect(err.message).toBe("User not found");
  });

  it("creates an internal error (500)", () => {
    const err = ApiError.internal();
    expect(err.status).toBe(500);
    expect(err.message).toBe("Internal server error");
  });

  it("creates an unauthorized error (401)", () => {
    const err = ApiError.unauthorized();
    expect(err.status).toBe(401);
  });

  it("includes optional details", () => {
    const err = ApiError.badRequest("Invalid email", { field: "email" });
    expect(err.details).toEqual({ field: "email" });
  });

  it("has the correct name", () => {
    const err = ApiError.badRequest("test");
    expect(err.name).toBe("ApiError");
  });
});

describe("sendError", () => {
  it("sends error response with correct status", async () => {
    const app = express();
    app.get("/test", (_req, res) => {
      sendError(res, ApiError.notFound("User not found"));
    });

    const res = await request(app).get("/test");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      error: "User not found",
      status: 404,
    });
  });

  it("sends error response with details", async () => {
    const app = express();
    app.get("/test", (_req, res) => {
      sendError(res, ApiError.badRequest("Validation failed", { field: "email" }));
    });

    const res = await request(app).get("/test");
    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Validation failed",
      status: 400,
      details: { field: "email" },
    });
  });
});

describe("compactLog", () => {
  it("returns 'null' for null", async () => {
    // Just verify the import works
    const mod = await import("../src/utils/compact-log.js");
    expect(mod.compactLog(null)).toBe("null");
    expect(mod.compactLog(undefined)).toBe("undefined");
    expect(mod.compactLog("hello")).toBe("hello");
    expect(mod.compactLog(42)).toBe("42");
    expect(mod.compactLog(true)).toBe("true");
    expect(mod.compactLog([])).toBe("[]");
    expect(mod.compactLog({})).toBe("{}");
  });
});
