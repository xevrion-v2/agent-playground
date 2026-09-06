import assert from 'node:assert/strict';
import test from 'node:test';
import { hasCaretCharacter } from './has-caret-character.js';

test('hasCaretCharacter returns true if string contains ^', () => {
  assert.equal(hasCaretCharacter('hello ^ world'), true);
  assert.equal(hasCaretCharacter('^'), true);
});

test('hasCaretCharacter returns false if string does not contain ^', () => {
  assert.equal(hasCaretCharacter('hello world'), false);
  assert.equal(hasCaretCharacter(''), false);
  assert.equal(hasCaretCharacter(null as any), false);
});
