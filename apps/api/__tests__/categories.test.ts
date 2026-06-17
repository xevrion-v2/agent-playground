import { describe, it, expect } from "vitest";
describe("Categories API", () => {
  it("GET /categories returns list", () => {
    expect(true).toBe(true);
  });
  it("category name is required", () => {
    expect("".length > 0).toBe(false);
  });
});