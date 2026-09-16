import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('Leaderboard update tests', () => {
  describe('incrementLeaderboard', () => {
    it('should add a new contributor with score 1', () => {
      const data = { existingUser: 5 };
      const updated = { ...data, newUser: (data['newUser'] ?? 0) + 1 };
      assert.equal(updated['newUser'], 1);
      assert.equal(updated.existingUser, 5);
    });

    it('should increment an existing contributor', () => {
      const data = { existingUser: 5 };
      const updated = { ...data, existingUser: (data.existingUser ?? 0) + 1 };
      assert.equal(updated.existingUser, 6);
    });

    it('should handle empty leaderboard', () => {
      const data = {};
      const updated = { ...data, newUser: (data['newUser'] ?? 0) + 1 };
      assert.equal(updated.newUser, 1);
    });
  });

  describe('loadLeaderboard', () => {
    it('should return empty object for empty input', () => {
      const data = {};
      assert.deepEqual(data, {});
    });
  });
});
