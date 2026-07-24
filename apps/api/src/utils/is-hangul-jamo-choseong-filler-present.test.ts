import { isHangulJamoChoseongFillerPresent } from './is-hangul-jamo-choseong-filler-present';

describe('isHangulJamoChoseongFillerPresent', () => {
  it('returns true if the string contains U+115F', () => {
    expect(isHangulJamoChoseongFillerPresent('abc\u115Fdef')).toBe(true);
  });

  it('returns false if the string does not contain U+115F', () => {
    expect(isHangulJamoChoseongFillerPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoChoseongFillerPresent('')).toBe(false);
  });

  it('returns true if the string is exactly U+115F', () => {
    expect(isHangulJamoChoseongFillerPresent('\u115F')).toBe(true);
  });
});
