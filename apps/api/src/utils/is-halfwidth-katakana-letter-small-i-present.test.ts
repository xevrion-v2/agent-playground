import { isHalfwidthKatakanaLetterSmallIPresent } from './is-halfwidth-katakana-letter-small-i-present';

describe('isHalfwidthKatakanaLetterSmallIPresent', () => {
  it('returns true if the string contains U+FF68', () => {
    expect(isHalfwidthKatakanaLetterSmallIPresent('abc\uFF68def')).toBe(true);
  });

  it('returns false if the string does not contain U+FF68', () => {
    expect(isHalfwidthKatakanaLetterSmallIPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHalfwidthKatakanaLetterSmallIPresent('')).toBe(false);
  });

  it('returns true if string is exactly U+FF68', () => {
    expect(isHalfwidthKatakanaLetterSmallIPresent('\uFF68')).toBe(true);
  });

  it('returns false for similar characters', () => {
    // U+FF69 is halfwidth Katakana letter small U, different from small I
    expect(isHalfwidthKatakanaLetterSmallIPresent('\uFF69')).toBe(false);
  });
});
