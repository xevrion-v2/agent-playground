import { isHangulJamoChitueumchieuchPresent } from "./is-hangul-jamo-chitueumchieuch-present";

describe("isHangulJamoChitueumchieuchPresent", () => {
  it("returns true if input contains U+1154", () => {
    expect(isHangulJamoChitueumchieuchPresent("abc\u1154def")).toBe(true);
  });

  it("returns false if input does not contain U+1154", () => {
    expect(isHangulJamoChitueumchieuchPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoChitueumchieuchPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoChitueumchieuchPresent("\u1153")).toBe(false);
    expect(isHangulJamoChitueumchieuchPresent("\u1155")).toBe(false);
  });
});
