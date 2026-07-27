import { isHangulJamoChitueumcieucPresent } from "./is-hangul-jamo-chitueumcieuc-present";

describe("isHangulJamoChitueumcieucPresent", () => {
  it("returns true if the input contains U+114E character", () => {
    expect(isHangulJamoChitueumcieucPresent("abc\u114Edef")).toBe(true);
  });

  it("returns false if the input does not contain U+114E character", () => {
    expect(isHangulJamoChitueumcieucPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoChitueumcieucPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoChitueumcieucPresent("\u114D")).toBe(false);
    expect(isHangulJamoChitueumcieucPresent("\u1150")).toBe(false);
  });
});
import { describe, it, expect } from "vitest";
import { isHangulJamoChitueumcieucPresent } from "./is-hangul-jamo-chitueumcieuc-present";

describe("isHangulJamoChitueumcieucPresent", () => {
  it("returns true if the input contains U+114E character", () => {
    expect(isHangulJamoChitueumcieucPresent("abc\u114Edef")).toBe(true);
  });

  it("returns false if the input does not contain U+114E character", () => {
    expect(isHangulJamoChitueumcieucPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoChitueumcieucPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoChitueumcieucPresent("\u114D")).toBe(false);
    expect(isHangulJamoChitueumcieucPresent("\u1150")).toBe(false);
  });
});
