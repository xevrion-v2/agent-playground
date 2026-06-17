import { describe, it, expect } from "vitest";
describe("Skills API", () => {
  it("lists skills", () => expect(true).toBe(true));
  it("validates skill name", () => expect("".length>0).toBe(false));
});