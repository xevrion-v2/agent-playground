// Tests for Button component
// Uses Node.js built-in test runner (Node >=20 required)
// CommonJS style matching project conventions

const assert = require('node:assert');
const { test, describe } = require('node:test');

// Dynamic import to load ESM-style TypeScript from CommonJS
const { Button } = require('../index.ts');

describe('Button component', () => {
  test('returns a button object with the given label', () => {
    const result = Button({ label: 'Click me' });
    assert.strictEqual(result.type, 'button');
    assert.strictEqual(result.label, 'Click me');
  });

  test('defaults disabled to false', () => {
    const result = Button({ label: 'Submit' });
    assert.strictEqual(result.disabled, false);
  });

  test('accepts disabled=true', () => {
    const result = Button({ label: 'Save', disabled: true });
    assert.strictEqual(result.disabled, true);
  });

  test('accepts disabled=false explicitly', () => {
    const result = Button({ label: 'Cancel', disabled: false });
    assert.strictEqual(result.disabled, false);
  });

  test('handles empty label string', () => {
    const result = Button({ label: '' });
    assert.strictEqual(result.label, '');
    assert.strictEqual(result.type, 'button');
    assert.strictEqual(result.disabled, false);
  });

  test('handles label with special characters', () => {
    const result = Button({ label: 'Hello <World> & "Friends"' });
    assert.strictEqual(result.label, 'Hello <World> & "Friends"');
  });

  test('always returns type "button"', () => {
    const result = Button({ label: 'Test', disabled: true });
    assert.strictEqual(result.type, 'button');
  });

  test('returns a plain object', () => {
    const result = Button({ label: 'Test' });
    assert.strictEqual(typeof result, 'object');
    assert.strictEqual(Array.isArray(result), false);
  });

  test('does not mutate the input props', () => {
    const props = { label: 'Test', disabled: true };
    const original = { ...props };
    const result = Button(props);
    assert.deepStrictEqual(props, original);
  });
});
