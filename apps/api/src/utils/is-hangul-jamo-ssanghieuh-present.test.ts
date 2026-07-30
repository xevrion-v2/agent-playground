import { isHangulJamoSsanghieuhPresent } from './is-hangul-jamo-ssanghieuh-present';

describe('isHangulJamoSsanghieuhPresent', () => {
  it('returns true if string contains U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('abc\u1158def')).toBe(true);
  });

  it('returns false if string does not contain U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoSsanghieuhPresent('')).toBe(false);
  });

  it('returns true if string is exactly U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('\u1158')).toBe(true);
  });
});
import { isHangulJamoSsanghieuhPresent } from './is-hangul-jamo-ssanghieuh-present';

describe('isHangulJamoSsanghieuhPresent', () => {
  it('returns true if string contains U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('abc\u1158def')).toBe(true);
  });

  it('returns false if string does not contain U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoSsanghieuhPresent('')).toBe(false);
  });

  it('returns true if string is exactly U+1158', () => {
    expect(isHangulJamoSsanghieuhPresent('\u1158')).toBe(true);
  });
});
