import { stripStringPrefix } from "./strip-string-prefix";

describe("stripStringPrefix", () => {
  it("removes prefix when present", () => {
    expect(stripStringPrefix("https://example.com", "https://")).toBe("example.com");
  });

  it("returns original when prefix not present", () => {
    expect(stripStringPrefix("hello", "world")).toBe("hello");
  });

  it("returns original when prefix is empty", () => {
    expect(stripStringPrefix("hello", "")).toBe("hello");
  });

  it("returns empty string when str equals prefix", () => {
    expect(stripStringPrefix("https://", "https://")).toBe("");
  });

  it("handles partial prefix correctly", () => {
    expect(stripStringPrefix("htthttps://", "https://")).toBe("htthttps://");
  });

  it("returns original for empty string", () => {
    expect(stripStringPrefix("", "https://")).toBe("");
  });
});
