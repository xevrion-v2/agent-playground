import { stringEqualsIgnoreCase } from "./string-equals-ignore-case";

describe("stringEqualsIgnoreCase", () => {
  it("returns true for identical strings", () => {
    expect(stringEqualsIgnoreCase("hello", "hello")).toBe(true);
  });

  it("returns true for different cases", () => {
    expect(stringEqualsIgnoreCase("Hello", "hello")).toBe(true);
    expect(stringEqualsIgnoreCase("HELLO", "hello")).toBe(true);
    expect(stringEqualsIgnoreCase("hello", "HELLO")).toBe(true);
  });

  it("returns false for different strings", () => {
    expect(stringEqualsIgnoreCase("abc", "def")).toBe(false);
  });

  it("returns true for empty strings", () => {
    expect(stringEqualsIgnoreCase("", "")).toBe(true);
  });

  it("handles mixed case", () => {
    expect(stringEqualsIgnoreCase("HeLLo", "heLLo")).toBe(true);
    expect(stringEqualsIgnoreCase("HeLLo", "hello")).toBe(true);
  });

  it("returns false for empty vs non-empty", () => {
    expect(stringEqualsIgnoreCase("", "a")).toBe(false);
    expect(stringEqualsIgnoreCase("a", "")).toBe(false);
  });
});
