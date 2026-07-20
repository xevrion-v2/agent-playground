import { describe, it, expect } from 'vitest';
import {
  incrementContributor,
  mergeLeaderboards,
  topContributors,
  totalPRs,
} from '../leaderboard';

describe('incrementContributor', () => {
  it('should add a new contributor with count 1', () => {
    const result = incrementContributor({}, 'alice');
    expect(result).toEqual({ alice: 1 });
  });

  it('should increment an existing contributor by 1', () => {
    const result = incrementContributor({ alice: 5 }, 'alice');
    expect(result).toEqual({ alice: 6 });
  });

  it('should not mutate the original leaderboard', () => {
    const original = { alice: 3, bob: 2 };
    const result = incrementContributor(original, 'alice');
    expect(original).toEqual({ alice: 3, bob: 2 });
    expect(result).toEqual({ alice: 4, bob: 2 });
  });

  it('should handle multiple increments', () => {
    let board = {};
    board = incrementContributor(board, 'alice');
    board = incrementContributor(board, 'bob');
    board = incrementContributor(board, 'alice');
    expect(board).toEqual({ alice: 2, bob: 1 });
  });

  it('should handle usernames with special characters', () => {
    const result = incrementContributor({}, 'github-actions[bot]');
    expect(result).toEqual({ 'github-actions[bot]': 1 });
  });
});

describe('mergeLeaderboards', () => {
  it('should merge two leaderboards summing counts', () => {
    const a = { alice: 3, bob: 2 };
    const b = { bob: 1, charlie: 5 };
    const result = mergeLeaderboards(a, b);
    expect(result).toEqual({ alice: 3, bob: 3, charlie: 5 });
  });

  it('should handle empty leaderboards', () => {
    const result = mergeLeaderboards({}, { alice: 1 });
    expect(result).toEqual({ alice: 1 });
  });

  it('should merge multiple leaderboards', () => {
    const result = mergeLeaderboards(
      { a: 1 },
      { b: 2 },
      { a: 3, b: 4 },
    );
    expect(result).toEqual({ a: 4, b: 6 });
  });

  it('should not mutate any input leaderboard', () => {
    const a = { alice: 1 };
    const b = { bob: 2 };
    mergeLeaderboards(a, b);
    expect(a).toEqual({ alice: 1 });
    expect(b).toEqual({ bob: 2 });
  });
});

describe('topContributors', () => {
  it('should return top N contributors sorted by count descending', () => {
    const board = { alice: 10, bob: 5, charlie: 20, dave: 3 };
    const result = topContributors(board, 2);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ username: 'charlie', count: 20 });
    expect(result[1]).toEqual({ username: 'alice', count: 10 });
  });

  it('should return all contributors if N exceeds total count', () => {
    const board = { alice: 5, bob: 3 };
    const result = topContributors(board, 10);
    expect(result).toHaveLength(2);
  });

  it('should return empty array for empty leaderboard', () => {
    const result = topContributors({}, 10);
    expect(result).toEqual([]);
  });

  it('should default to top 10', () => {
    const board: Record<string, number> = {};
    for (let i = 1; i <= 15; i++) {
      board[`user${i}`] = i;
    }
    const result = topContributors(board);
    expect(result).toHaveLength(10);
  });
});

describe('totalPRs', () => {
  it('should sum all counts', () => {
    const board = { alice: 10, bob: 5, charlie: 3 };
    expect(totalPRs(board)).toBe(18);
  });

  it('should return 0 for empty leaderboard', () => {
    expect(totalPRs({})).toBe(0);
  });

  it('should handle single contributor', () => {
    expect(totalPRs({ alice: 42 })).toBe(42);
  });
});
