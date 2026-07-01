import { stripStringSuffix } from "./strip-string-suffix";

describe("stripStringSuffix", () => {
  it("removes suffix when present", () => {
    expect(stripStringSuffix("hello.txt", ".txt")).toBe("hello");
  });

  it("returns original when suffix not present", () => {
    expect(stripStringSuffix("hello.txt", ".csv")).toBe("hello.txt");
  });

  it("returns original when suffix is empty", () => {
    expect(stripStringSuffix("hello", "")).toBe("hello");
  });

  it("returns empty string when str equals suffix", () => {
    expect(stripStringSuffix(".txt", ".txt")).toBe("");
  });

  it("handles partial suffix match correctly", () => {
    expect(stripStringSuffix("hello.txtxt", ".txt")).toBe("hello.txtxt".slice(0, "hello.txtxt".length - ".txt".length));
  });

  it("returns original for empty string", () => {
    expect(stripStringSuffix("", ".txt")).toBe("");
  });
});
