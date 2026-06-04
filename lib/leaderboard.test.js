import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { applyLeaderboardUpdate } from './leaderboard.js';

describe('applyLeaderboardUpdate', () => {
  it('increments an existing contributor', () => {
    const board = { alice: 5, bob: 3 };
    const result = applyLeaderboardUpdate(board, 'alice');
    assert.deepStrictEqual(result, { alice: 6, bob: 3 });
    // original is untouched
    assert.deepStrictEqual(board, { alice: 5, bob: 3 });
  });

  it('adds a new contributor with initial count', () => {
    const board = { alice: 5 };
    const result = applyLeaderboardUpdate(board, 'charlie');
    assert.deepStrictEqual(result, { alice: 5, charlie: 1 });
  });

  it('trims contributor name', () => {
    const board = {};
    const result = applyLeaderboardUpdate(board, '  dave  ');
    assert.deepStrictEqual(result, { dave: 1 });
  });

  it('throws on empty contributor name', () => {
    assert.throws(() => applyLeaderboardUpdate({}, '   '), /must not be empty/);
  });

  it('supports custom increment amount', () => {
    const board = { eve: 2 };
    const result = applyLeaderboardUpdate(board, 'eve', 10);
    assert.deepStrictEqual(result, { eve: 12 });
  });
});
