import assert from 'node:assert/strict';
import test from 'node:test';
import { hasDollarCharacter } from './has-dollar-character.js';

test('hasDollarCharacter returns true if string contains $', () => {
  assert.equal(hasDollarCharacter('hello $ world'), true);
  assert.equal(hasDollarCharacter('$'), true);
});

test('hasDollarCharacter returns false if string does not contain $', () => {
  assert.equal(hasDollarCharacter('hello world'), false);
  assert.equal(hasDollarCharacter(''), false);
  assert.equal(hasDollarCharacter(null as any), false);
});
