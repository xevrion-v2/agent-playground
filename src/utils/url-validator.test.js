// Tests for URL validator
// Uses Node.js built-in test runner

const assert = require('node:assert');
const { test, describe } = require('node:test');
const { isValidUrl, extractDomain, isHttps } = require('./url-validator');

describe('isValidUrl', () => {
  test('accepts valid https URL', () => {
    assert.strictEqual(isValidUrl('https://example.com'), true);
  });

  test('accepts valid http URL', () => {
    assert.strictEqual(isValidUrl('http://example.com'), true);
  });

  test('accepts URL with path', () => {
    assert.strictEqual(isValidUrl('https://example.com/path/to/page'), true);
  });

  test('accepts URL with query params', () => {
    assert.strictEqual(isValidUrl('https://example.com?q=hello&page=1'), true);
  });

  test('accepts URL with port', () => {
    assert.strictEqual(isValidUrl('https://example.com:8080'), true);
  });

  test('accepts URL with subdomain', () => {
    assert.strictEqual(isValidUrl('https://api.example.com/v1'), true);
  });

  test('rejects plain string', () => {
    assert.strictEqual(isValidUrl('hello world'), false);
  });

  test('rejects empty string', () => {
    assert.strictEqual(isValidUrl(''), false);
  });

  test('rejects null', () => {
    assert.strictEqual(isValidUrl(null), false);
  });

  test('rejects undefined', () => {
    assert.strictEqual(isValidUrl(undefined), false);
  });

  test('rejects number', () => {
    assert.strictEqual(isValidUrl(123), false);
  });

  test('rejects missing protocol', () => {
    assert.strictEqual(isValidUrl('example.com'), false);
  });

  test('rejects whitespace only', () => {
    assert.strictEqual(isValidUrl('   '), false);
  });

  test('accepts URL with hash fragment', () => {
    assert.strictEqual(isValidUrl('https://example.com#section'), true);
  });

  test('accepts localhost URL', () => {
    assert.strictEqual(isValidUrl('http://localhost:3000'), true);
  });

  test('accepts IP address URL', () => {
    assert.strictEqual(isValidUrl('https://127.0.0.1'), true);
  });
});

describe('extractDomain', () => {
  test('extracts domain from simple URL', () => {
    assert.strictEqual(extractDomain('https://example.com'), 'example.com');
  });

  test('extracts domain with www', () => {
    assert.strictEqual(extractDomain('https://www.example.com'), 'www.example.com');
  });

  test('extracts domain from URL with path', () => {
    assert.strictEqual(extractDomain('https://example.com/path'), 'example.com');
  });

  test('extracts domain from URL with subdomain', () => {
    assert.strictEqual(extractDomain('https://api.github.com'), 'api.github.com');
  });

  test('returns null for invalid URL', () => {
    assert.strictEqual(extractDomain('not-a-url'), null);
  });

  test('returns null for empty string', () => {
    assert.strictEqual(extractDomain(''), null);
  });

  test('returns null for null', () => {
    assert.strictEqual(extractDomain(null), null);
  });
});

describe('isHttps', () => {
  test('returns true for https URL', () => {
    assert.strictEqual(isHttps('https://example.com'), true);
  });

  test('returns false for http URL', () => {
    assert.strictEqual(isHttps('http://example.com'), false);
  });

  test('returns null for invalid URL', () => {
    assert.strictEqual(isHttps('not-a-url'), null);
  });

  test('returns null for empty string', () => {
    assert.strictEqual(isHttps(''), null);
  });
});
