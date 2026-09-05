import test from 'node:test';
import assert from 'node:assert';
import { incrementLeaderboard, updateLeaderboardJson } from '../update-leaderboard.mjs';

test('incrementLeaderboard adds a new contributor with count 1', () => {
  const initial = {
    alice: 2,
    bob: 1
  };
  const updated = incrementLeaderboard(initial, 'charlie');

  assert.strictEqual(updated.charlie, 1);
  assert.strictEqual(updated.alice, 2);
  assert.strictEqual(updated.bob, 1);
});

test('incrementLeaderboard increments PR count for an existing contributor', () => {
  const initial = {
    alice: 2,
    bob: 1
  };
  const updated = incrementLeaderboard(initial, 'alice');

  assert.strictEqual(updated.alice, 3);
  assert.strictEqual(updated.bob, 1);
});

test('incrementLeaderboard works with an empty leaderboard map', () => {
  const updated = incrementLeaderboard({}, 'newuser');
  assert.deepStrictEqual(updated, { newuser: 1 });
});

test('incrementLeaderboard throws an error on invalid or empty username', () => {
  assert.throws(() => incrementLeaderboard({}, ''), /Invalid username/);
  assert.throws(() => incrementLeaderboard({}, null), /Invalid username/);
  assert.throws(() => incrementLeaderboard({}, '   '), /Invalid username/);
});

test('updateLeaderboardJson parses string, increments, and serializes clean JSON', () => {
  const rawJson = JSON.stringify({ contributorA: 5 });
  const resultJson = updateLeaderboardJson(rawJson, 'contributorB');
  const parsed = JSON.parse(resultJson);

  assert.strictEqual(parsed.contributorA, 5);
  assert.strictEqual(parsed.contributorB, 1);
  assert.ok(resultJson.endsWith('\n'), 'Output JSON should end with a newline');
});
