import { describe, it, expect } from "vitest";
import { omitEmpty } from "../omit-empty";

describe("omitEmpty", () => {
  it("removes null values", () => {
    const result = omitEmpty({ a: 1, b: null, c: "hello" });
    expect(result).toEqual({ a: 1, c: "hello" });
  });

  it("removes undefined values", () => {
    const result = omitEmpty({ a: 1, b: undefined, c: "hello" });
    expect(result).toEqual({ a: 1, c: "hello" });
  });

  it("removes empty string values", () => {
    const result = omitEmpty({ a: 1, b: "", c: "hello" });
    expect(result).toEqual({ a: 1, c: "hello" });
  });

  it("removes null, undefined, and empty strings together", () => {
    const result = omitEmpty({
      name: "Alice",
      age: null,
      email: "",
      nickname: undefined,
      score: 0,
    });
    expect(result).toEqual({ name: "Alice", score: 0 });
  });

  it("keeps falsy-but-valid values like 0 and false", () => {
    const result = omitEmpty({ count: 0, active: false, label: "test" });
    expect(result).toEqual({ count: 0, active: false, label: "test" });
  });

  it("returns empty object for all-empty input", () => {
    const result = omitEmpty({ a: null, b: undefined, c: "" });
    expect(result).toEqual({});
  });

  it("returns same object when no empty values", () => {
    const result = omitEmpty({ a: 1, b: "hello", c: true });
    expect(result).toEqual({ a: 1, b: "hello", c: true });
  });

  it("does not mutate the original object", () => {
    const original: Record<string, unknown> = { a: 1, b: null, c: "" };
    const copy = { ...original };
    omitEmpty(original);
    expect(original).toEqual(copy);
  });

  it("handles empty object", () => {
    const result = omitEmpty({});
    expect(result).toEqual({});
  });

  it("handles nested objects (keeps them as-is)", () => {
    const result = omitEmpty({ data: { a: null, b: 1 }, meta: null });
    expect(result).toEqual({ data: { a: null, b: 1 } });
  });
});
