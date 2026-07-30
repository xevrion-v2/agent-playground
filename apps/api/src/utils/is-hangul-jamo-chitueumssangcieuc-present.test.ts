import { isHangulJamoChitueumssangcieucPresent } from "./is-hangul-jamo-chitueumssangcieuc-present";

describe("isHangulJamoChitueumssangcieucPresent", () => {
  it("returns true if input contains U+114F character", () => {
    expect(isHangulJamoChitueumssangcieucPresent("abc\u114Fdef")).toBe(true);
  });

  it("returns false if input does not contain U+114F character", () => {
    expect(isHangulJamoChitueumssangcieucPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoChitueumssangcieucPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoChitueumssangcieucPresent("\u114E")).toBe(false);
    expect(isHangulJamoChitueumssangcieucPresent("\u1150")).toBe(false);
  });
});
