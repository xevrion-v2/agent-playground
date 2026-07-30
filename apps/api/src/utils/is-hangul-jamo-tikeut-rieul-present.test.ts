import { isHangulJamoTikeutRieulPresent } from "./is-hangul-jamo-tikeut-rieul-present";

describe("isHangulJamoTikeutRieulPresent", () => {
  it("returns true if input contains U+115E", () => {
    expect(isHangulJamoTikeutRieulPresent("abc\u115Edef")).toBe(true);
  });

  it("returns false if input does not contain U+115E", () => {
    expect(isHangulJamoTikeutRieulPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoTikeutRieulPresent("")).toBe(false);
  });

  it("returns false for strings with other Hangul Jamo characters", () => {
    expect(isHangulJamoTikeutRieulPresent("abc\u1100def")).toBe(false); // U+1100 choseong kiyeok
  });
});
