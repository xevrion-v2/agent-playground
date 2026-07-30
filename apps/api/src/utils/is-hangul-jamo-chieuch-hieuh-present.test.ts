import { isHangulJamoChieuchHieuhPresent } from './is-hangul-jamo-chieuch-hieuh-present';

describe('isHangulJamoChieuchHieuhPresent', () => {
  it('returns true if input contains U+1153 character', () => {
    expect(isHangulJamoChieuchHieuhPresent('abc\u1153def')).toBe(true);
  });

  it('returns false if input does not contain U+1153 character', () => {
    expect(isHangulJamoChieuchHieuhPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoChieuchHieuhPresent('')).toBe(false);
  });

  it('returns false for string with similar but different characters', () => {
    expect(isHangulJamoChieuchHieuhPresent('\u1152')).toBe(false);
    expect(isHangulJamoChieuchHieuhPresent('\u1154')).toBe(false);
  });
});
import { isHangulJamoChieuchHieuhPresent } from './is-hangul-jamo-chieuch-hieuh-present';

describe('isHangulJamoChieuchHieuhPresent', () => {
  it('returns true if input contains U+1153 character', () => {
    expect(isHangulJamoChieuchHieuhPresent('abc\u1153def')).toBe(true);
  });

  it('returns false if input does not contain U+1153 character', () => {
    expect(isHangulJamoChieuchHieuhPresent('abcdef')).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isHangulJamoChieuchHieuhPresent('')).toBe(false);
  });

  it('returns false for string with similar but different characters', () => {
    expect(isHangulJamoChieuchHieuhPresent('\u1152')).toBe(false);
    expect(isHangulJamoChieuchHieuhPresent('\u1154')).toBe(false);
  });
});
