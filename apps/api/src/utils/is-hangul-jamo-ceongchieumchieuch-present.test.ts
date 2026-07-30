import { isHangulJamoCeongchieumchieuchPresent } from "./is-hangul-jamo-ceongchieumchieuch-present";

describe("isHangulJamoCeongchieumchieuchPresent", () => {
  it("returns true if the input contains U+1155", () => {
    expect(isHangulJamoCeongchieumchieuchPresent("abc\u1155def")).toBe(true);
  });

  it("returns false if the input does not contain U+1155", () => {
    expect(isHangulJamoCeongchieumchieuchPresent("abcdef")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(isHangulJamoCeongchieumchieuchPresent("")).toBe(false);
  });

  it("returns false for string with similar but different characters", () => {
    expect(isHangulJamoCeongchieumchieuchPresent("\u1154")).toBe(false);
    expect(isHangulJamoCeongchieumchieuchPresent("\u1156")).toBe(false);
  });
});
