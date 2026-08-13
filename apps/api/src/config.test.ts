import { describe, it, expect } from 'vitest';
import { getPort } from '../config';

describe('getPort', () => {
  it('should return 4000 when PORT is undefined', () => {
    expect(getPort(undefined)).toBe(4000);
  });

  it('should return 4000 when PORT is empty string', () => {
    expect(getPort('')).toBe(4000);
  });

  it('should return valid port number', () => {
    expect(getPort('3000')).toBe(3000);
    expect(getPort('8080')).toBe(8080);
    expect(getPort('65535')).toBe(65535);
  });

  it('should throw error for non-numeric PORT', () => {
    expect(() => getPort('abc')).toThrow('Invalid PORT value');
  });

  it('should throw error for out of range PORT', () => {
    expect(() => getPort('70000')).toThrow('out of range');
    expect(() => getPort('-1')).toThrow('out of range');
  });
});
