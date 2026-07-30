import { isHangulJamoKapyeounphieuphPresent } from "./is-hangul-jamo-kapyeounphieuph-present";

describe("isHangulJamoKapyeounphieuphPresent", () => {
  it("returns true if input contains U+1157", () => {
    expect(isHangulJamoKapyeounphieuphPresent("abc\u1157def")).toBe(true);
  });

  it("returns false if input does not contain U+1157", () => {
    expect(isHangulJamoKapyeounphieuphPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoKapyeounphieuphPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoKapyeounphieuphPresent("\u1156")).toBe(false);
    expect(isHangulJamoKapyeounphieuphPresent("\u1160")).toBe(false);
  });
});
