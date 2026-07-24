import { isHalfwidthKatakanaLetterSmallYuPresent } from './is-halfwidth-katakana-letter-small-yu-present';

describe('isHalfwidthKatakanaLetterSmallYuPresent', () => {
  it('returns true when input contains the halfwidth Katakana letter small YU (U+FF6D)', () => {
    expect(isHalfwidthKatakanaLetterSmallYuPresent('abc\uFF6Dxyz')).toBe(true);
  });

  it('returns false when input does not contain the character', () => {
    expect(isHalfwidthKatakanaLetterSmallYuPresent('abcdefg')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHalfwidthKatakanaLetterSmallYuPresent('')).toBe(false);
  });

  it('returns false for strings with similar but different characters', () => {
    // Fullwidth Katakana small YU is U+30E5, different from halfwidth U+FF6D
    expect(isHalfwidthKatakanaLetterSmallYuPresent('\u30E5')).toBe(false);
  });
});
