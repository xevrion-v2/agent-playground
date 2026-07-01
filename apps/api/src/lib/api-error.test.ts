import { describe, it, expect } from "vitest";
import { ApiError, sendError } from "./api-error";
import type { Response } from "express";

describe("ApiError", () => {
  it("creates error with status, message, and code", () => {
    const err = new ApiError(400, "Bad input", "BAD_REQUEST");
    expect(err.status).toBe(400);
    expect(err.message).toBe("Bad input");
    expect(err.code).toBe("BAD_REQUEST");
    expect(err.name).toBe("ApiError");
  });

  it("badRequest defaults to 'Bad request'", () => {
    const err = ApiError.badRequest();
    expect(err.status).toBe(400);
    expect(err.message).toBe("Bad request");
    expect(err.code).toBe("BAD_REQUEST");
  });

  it("badRequest accepts custom message", () => {
    const err = ApiError.badRequest("Invalid email");
    expect(err.message).toBe("Invalid email");
  });

  it("notFound defaults to 'Resource not found'", () => {
    const err = ApiError.notFound();
    expect(err.status).toBe(404);
    expect(err.code).toBe("NOT_FOUND");
  });

  it("internal defaults to 'Internal server error'", () => {
    const err = ApiError.internal();
    expect(err.status).toBe(500);
    expect(err.code).toBe("INTERNAL_ERROR");
  });
});
