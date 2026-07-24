import { isHalfwidthKatakanaLetterSmallOPresent } from './is-halfwidth-katakana-letter-small-o-present';

describe('isHalfwidthKatakanaLetterSmallOPresent', () => {
  it('returns true if the input contains the halfwidth Katakana letter small O (U+FF6B)', () => {
    expect(isHalfwidthKatakanaLetterSmallOPresent('abc\uFF6Bdef')).toBe(true);
  });

  it('returns false if the input does not contain the character', () => {
    expect(isHalfwidthKatakanaLetterSmallOPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHalfwidthKatakanaLetterSmallOPresent('')).toBe(false);
  });

  it('returns false for other similar characters', () => {
    expect(isHalfwidthKatakanaLetterSmallOPresent('\uFF6A')).toBe(false); // small KA
    expect(isHalfwidthKatakanaLetterSmallOPresent('\uFF6C')).toBe(false); // small U
  });
});
