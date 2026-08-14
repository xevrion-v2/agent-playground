import { isKangxiRadicalSlicePresent } from '../../apps/api/src/utils/is-kangxi-radical-slice-present';

describe('isKangxiRadicalSlicePresent', () => {
  it('returns true when Kangxi Radical Slice (U+2F63) is present', () => {
    expect(isKangxiRadicalSlicePresent('\u2F63')).toBe(true);
  });

  it('returns true when string contains Kangxi Radical Slice among other chars', () => {
    expect(isKangxiRadicalSlicePresent('hello\u2F63world')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isKangxiRadicalSlicePresent('')).toBe(false);
  });

  it('returns false for regular ASCII text', () => {
    expect(isKangxiRadicalSlicePresent('abcdefg')).toBe(false);
  });

  it('returns false for other Kangxi radicals', () => {
    // U+2F3B is Step (already tested in #6223)
    expect(isKangxiRadicalSlicePresent('\u2F3B')).toBe(false);
    // U+2F00 is Radical One
    expect(isKangxiRadicalSlicePresent('\u2F00')).toBe(false);
  });
});
