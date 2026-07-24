import { isHangulJamoChieuchKhieukhPresent } from "./is-hangul-jamo-chieuch-khieukh-present";

describe("isHangulJamoChieuchKhieukhPresent", () => {
  it("returns true if input contains U+1152 character", () => {
    expect(isHangulJamoChieuchKhieukhPresent("abc\u1152def")).toBe(true);
  });

  it("returns false if input does not contain U+1152 character", () => {
    expect(isHangulJamoChieuchKhieukhPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoChieuchKhieukhPresent("")).toBe(false);
  });

  it("returns true if input is exactly the U+1152 character", () => {
    expect(isHangulJamoChieuchKhieukhPresent("\u1152")).toBe(true);
  });
});
