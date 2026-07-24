import { isHangulJamoCeongchieumcieucPresent } from './is-hangul-jamo-ceongchieumcieuc-present';

describe('isHangulJamoCeongchieumcieucPresent', () => {
  it('returns true if input contains U+1150 character', () => {
    expect(isHangulJamoCeongchieumcieucPresent('abc\u1150def')).toBe(true);
  });

  it('returns false if input does not contain U+1150 character', () => {
    expect(isHangulJamoCeongchieumcieucPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoCeongchieumcieucPresent('')).toBe(false);
  });

  it('returns false for string with similar but different characters', () => {
    expect(isHangulJamoCeongchieumcieucPresent('\u114F')).toBe(false); // U+114F is a different Hangul choseong
  });
});
