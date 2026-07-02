import assert from 'node:assert/strict';
import test from 'node:test';
import { hasAtSymbolCharacter } from './has-at-symbol-character.js';

test('hasAtSymbolCharacter returns true if string contains @', () => {
  assert.equal(hasAtSymbolCharacter('hello @ world'), true);
  assert.equal(hasAtSymbolCharacter('@'), true);
});

test('hasAtSymbolCharacter returns false if string does not contain @', () => {
  assert.equal(hasAtSymbolCharacter('hello world'), false);
  assert.equal(hasAtSymbolCharacter(''), false);
  assert.equal(hasAtSymbolCharacter(null as any), false);
});
