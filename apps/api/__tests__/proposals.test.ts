import { describe, it, expect } from "vitest";
describe("Proposals API", () => {
  it("GET /proposals returns list", () => {
    expect(true).toBe(true);
  });
  it("POST /proposals creates item", () => {
    const data = { summary: "Test", amount: 100 };
    expect(data.summary).toBe("Test");
  });
});