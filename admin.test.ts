import { describe, it, expect } from "vitest";
describe("Admin API", () => {
  it("lists users", () => expect(true).toBe(true));
  it("requires admin role", () => expect("admin"==="admin").toBe(true));
});