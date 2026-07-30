import { isHangulJamoCeongchieumssangcieucPresent } from "./is-hangul-jamo-ceongchieumssangcieuc-present";

describe("isHangulJamoCeongchieumssangcieucPresent", () => {
  it("returns true if input contains U+1151 character", () => {
    const input = "abc\u1151def";
    expect(isHangulJamoCeongchieumssangcieucPresent(input)).toBe(true);
  });

  it("returns false if input does not contain U+1151 character", () => {
    const input = "abcdef";
    expect(isHangulJamoCeongchieumssangcieucPresent(input)).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoCeongchieumssangcieucPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    const input = "abc\u1150def"; // U+1150 is a different Hangul choseong character
    expect(isHangulJamoCeongchieumssangcieucPresent(input)).toBe(false);
  });
});
