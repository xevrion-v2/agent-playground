const test = require('node:test');
const assert = require('node:assert/strict');

const { updateLeaderboard } = require('./update-leaderboard');

test('adds a new contributor to the leaderboard', () => {
  const leaderboard = [
    { username: 'alice', score: 10 },
    { username: 'bob', score: 5 }
  ];

  const updated = updateLeaderboard(leaderboard, {
    username: 'charlie',
    score: 7
  });

  assert.deepEqual(updated, [
    { username: 'alice', score: 10 },
    { username: 'charlie', score: 7 },
    { username: 'bob', score: 5 }
  ]);
});

test('updates an existing contributor score instead of adding a duplicate entry', () => {
  const leaderboard = [
    { username: 'alice', score: 10 },
    { username: 'bob', score: 5 }
  ];

  const updated = updateLeaderboard(leaderboard, {
    username: 'bob',
    score: 8
  });

  assert.deepEqual(updated, [
    { username: 'bob', score: 13 },
    { username: 'alice', score: 10 }
  ]);
  assert.equal(updated.filter((entry) => entry.username === 'bob').length, 1);
});
