import { isHangulJamoYeorinhieuhPresent } from "./is-hangul-jamo-yeorinhieuh-present";

describe("isHangulJamoYeorinhieuhPresent", () => {
  it("returns true if input contains U+1159", () => {
    expect(isHangulJamoYeorinhieuhPresent("abc\u1159def")).toBe(true);
  });

  it("returns false if input does not contain U+1159", () => {
    expect(isHangulJamoYeorinhieuhPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoYeorinhieuhPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoYeorinhieuhPresent("\u1158")).toBe(false);
    expect(isHangulJamoYeorinhieuhPresent("\u1160")).toBe(false);
  });
});
