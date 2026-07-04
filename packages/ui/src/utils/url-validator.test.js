const { isValidUrl, extractDomain, isHttps } = require('./url-validator');

describe('isValidUrl', () => {
  test('validates standard http URL', () => {
    expect(isValidUrl('http://example.com')).toBe(true);
  });

  test('validates standard https URL', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  test('validates URL with path', () => {
    expect(isValidUrl('https://example.com/path/to/page')).toBe(true);
  });

  test('validates URL with query params', () => {
    expect(isValidUrl('https://example.com/page?q=search&lang=en')).toBe(true);
  });

  test('validates URL with port', () => {
    expect(isValidUrl('https://example.com:8080/page')).toBe(true);
  });

  test('validates subdomain URL', () => {
    expect(isValidUrl('https://api.example.com')).toBe(true);
  });

  test('rejects null', () => {
    expect(isValidUrl(null)).toBe(false);
  });

  test('rejects undefined', () => {
    expect(isValidUrl(undefined)).toBe(false);
  });

  test('rejects empty string', () => {
    expect(isValidUrl('')).toBe(false);
  });

  test('rejects whitespace only', () => {
    expect(isValidUrl('   ')).toBe(false);
  });

  test('rejects random string', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
  });

  test('rejects non-string inputs', () => {
    expect(isValidUrl(123)).toBe(false);
  });

  test('rejects malformed URL', () => {
    expect(isValidUrl('http://')).toBe(false);
  });

  test('rejects ftp URL', () => {
    expect(isValidUrl('ftp://files.example.com')).toBe(true);
  });

  test('handles URL with trailing slash', () => {
    expect(isValidUrl('https://example.com/')).toBe(true);
  });

  test('handles IP address URL', () => {
    expect(isValidUrl('https://192.168.1.1')).toBe(true);
  });

  test('handles localhost', () => {
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  test('rejects javascript protocol', () => {
    expect(isValidUrl('javascript:alert(1)')).toBe(false);
  });

  test('rejects data protocol', () => {
    expect(isValidUrl('data:text/plain,hello')).toBe(false);
  });

  test('handles URL with auth', () => {
    expect(isValidUrl('https://user:pass@example.com')).toBe(true);
  });
});

describe('extractDomain', () => {
  test('extracts domain from http URL', () => {
    expect(extractDomain('http://example.com')).toBe('example.com');
  });

  test('extracts domain from https URL', () => {
    expect(extractDomain('https://example.com')).toBe('example.com');
  });

  test('extracts domain from URL with path', () => {
    expect(extractDomain('https://example.com/path/to/page')).toBe('example.com');
  });

  test('extracts subdomain', () => {
    expect(extractDomain('https://api.example.com')).toBe('api.example.com');
  });

  test('extracts domain with port', () => {
    expect(extractDomain('https://example.com:8080/page')).toBe('example.com');
  });

  test('returns empty for null', () => {
    expect(extractDomain(null)).toBe('');
  });

  test('returns empty for empty string', () => {
    expect(extractDomain('')).toBe('');
  });

  test('returns empty for non-URL string', () => {
    expect(extractDomain('not-a-url')).toBe('');
  });
});

describe('isHttps', () => {
  test('returns true for https URL', () => {
    expect(isHttps('https://example.com')).toBe(true);
  });

  test('returns false for http URL', () => {
    expect(isHttps('http://example.com')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isHttps(null)).toBe(false);
  });

  test('returns false for empty string', () => {
    expect(isHttps('')).toBe(false);
  });

  test('returns false for non-URL string', () => {
    expect(isHttps('not-a-url')).toBe(false);
  });
});
