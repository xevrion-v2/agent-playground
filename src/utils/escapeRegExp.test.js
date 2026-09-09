const { describe, it } = require('node:test');
const assert = require('node:assert');
const { escapeRegExp } = require('./escapeRegExp');

describe('escapeRegExp', () => {
  it('escapes dots', () => {
    assert.strictEqual(escapeRegExp('hello.world'), 'hello\\.world');
  });

  it('escapes asterisks', () => {
    assert.strictEqual(escapeRegExp('a*b'), 'a\\*b');
  });

  it('escapes plus signs', () => {
    assert.strictEqual(escapeRegExp('a+b'), 'a\\+b');
  });

  it('escapes question marks', () => {
    assert.strictEqual(escapeRegExp('a?b'), 'a\\?b');
  });

  it('escapes caret', () => {
    assert.strictEqual(escapeRegExp('^start'), '\\^start');
  });

  it('escapes dollar sign', () => {
    assert.strictEqual(escapeRegExp('end$'), 'end\\$');
  });

  it('escapes curly braces', () => {
    assert.strictEqual(escapeRegExp('{n}'), '\\{n\\}');
  });

  it('escapes parentheses', () => {
    assert.strictEqual(escapeRegExp('(group)'), '\\(group\\)');
  });

  it('escapes square brackets', () => {
    assert.strictEqual(escapeRegExp('[chars]'), '\\[chars\\]');
  });

  it('escapes backslashes', () => {
    assert.strictEqual(escapeRegExp('a\\b'), 'a\\\\b');
  });

  it('escapes pipe character', () => {
    assert.strictEqual(escapeRegExp('a|b'), 'a\\|b');
  });

  it('escapes all special characters together', () => {
    assert.strictEqual(escapeRegExp('.*+?^${}()[]\\\|'), '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\[\\]\\\\\\|');
  });

  it('returns plain strings unchanged', () => {
    assert.strictEqual(escapeRegExp('hello'), 'hello');
    assert.strictEqual(escapeRegExp('123'), '123');
  });

  it('handles empty string', () => {
    assert.strictEqual(escapeRegExp(''), '');
  });

  it('throws on non-string input', () => {
    assert.throws(() => escapeRegExp(null), TypeError);
    assert.throws(() => escapeRegExp(123), TypeError);
  });

  it('produces a valid regex pattern', () => {
    const escaped = escapeRegExp('hello.world[1]');
    const regex = new RegExp(escaped);
    assert.ok(regex.test('hello.world[1]'));
    assert.ok(!regex.test('helloXworld[1]'));
  });
});
