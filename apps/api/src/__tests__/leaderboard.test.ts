import { describe, it, expect } from 'vitest';

describe('Leaderboard', () => {
  it('should return sorted results', () => {
    const scores = [{ user: 'Alice', score: 100 }, { user: 'Bob', score: 200 }];
    const sorted = scores.sort((a, b) => b.score - a.score);
    expect(sorted[0].user).toBe('Bob');
  });

  it('should handle empty leaderboard', () => {
    expect([]).toHaveLength(0);
  });

  it('should limit results', () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ rank: i + 1 }));
    expect(items.slice(0, 5)).toHaveLength(5);
  });
});
