import { isHangulJamoNieunHieuhPresent } from "./is-hangul-jamo-nieun-hieuh-present";

describe("isHangulJamoNieunHieuhPresent", () => {
  it("returns true if the input contains U+115D", () => {
    expect(isHangulJamoNieunHieuhPresent("abc\u115Ddef")).toBe(true);
  });

  it("returns false if the input does not contain U+115D", () => {
    expect(isHangulJamoNieunHieuhPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoNieunHieuhPresent("")).toBe(false);
  });

  it("returns false for strings with other Hangul Jamo characters", () => {
    expect(isHangulJamoNieunHieuhPresent("\u1100\u1101\u1102")).toBe(false);
  });
});
import { describe, it, expect } from "vitest";
import { isHangulJamoNieunHieuhPresent } from "./is-hangul-jamo-nieun-hieuh-present";

describe("isHangulJamoNieunHieuhPresent", () => {
  it("returns true if the input contains U+115D", () => {
    expect(isHangulJamoNieunHieuhPresent("abc\u115Ddef")).toBe(true);
  });

  it("returns false if the input does not contain U+115D", () => {
    expect(isHangulJamoNieunHieuhPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoNieunHieuhPresent("")).toBe(false);
  });

  it("returns false for strings with other Hangul Jamo characters", () => {
    expect(isHangulJamoNieunHieuhPresent("\u1100\u1101\u1102")).toBe(false);
  });
});
