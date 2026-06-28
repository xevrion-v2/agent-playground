import { describe, it, expect, beforeEach } from 'vitest';

interface LeaderboardEntry {
  username: string;
  points: number;
  position: number;
  updatedAt: string;
}

function updateLeaderboard(
  entries: LeaderboardEntry[],
  newEntry: { username: string; points: number }
): LeaderboardEntry[] {
  const updated = entries.filter(e => e.username !== newEntry.username);
  updated.push({
    ...newEntry,
    position: 0,
    updatedAt: new Date().toISOString(),
  });
  updated.sort((a, b) => b.points - a.points);
  updated.forEach((entry, index) => {
    entry.position = index + 1;
  });
  return updated;
}

describe('Leaderboard Updates', () => {
  let initialEntries: LeaderboardEntry[];

  beforeEach(() => {
    initialEntries = [
      { username: 'alice', points: 100, position: 1, updatedAt: '2026-01-01T00:00:00Z' },
      { username: 'bob', points: 75, position: 2, updatedAt: '2026-01-01T00:00:00Z' },
      { username: 'charlie', points: 50, position: 3, updatedAt: '2026-01-01T00:00:00Z' },
    ];
  });

  it('adds a new contributor to the leaderboard', () => {
    const result = updateLeaderboard(initialEntries, { username: 'diana', points: 60 });
    expect(result).toHaveLength(4);
    expect(result.find(e => e.username === 'diana')).toBeTruthy();
  });

  it('updates an existing contributor points', () => {
    const result = updateLeaderboard(initialEntries, { username: 'bob', points: 200 });
    const bob = result.find(e => e.username === 'bob');
    expect(bob?.points).toBe(200);
    expect(bob?.position).toBe(1);
  });

  it('maintains correct position ordering after update', () => {
    const result = updateLeaderboard(initialEntries, { username: 'diana', points: 80 });
    const positions = result.map(e => e.position);
    expect(positions).toEqual([1, 2, 3, 4]);
  });

  it('highest points gets position 1', () => {
    const result = updateLeaderboard(initialEntries, { username: 'eve', points: 1000 });
    expect(result[0].username).toBe('eve');
    expect(result[0].position).toBe(1);
  });

  it('preserves timestamps of unchanged entries', () => {
    const result = updateLeaderboard(initialEntries, { username: 'diana', points: 60 });
    const alice = result.find(e => e.username === 'alice');
    expect(alice?.updatedAt).toBe('2026-01-01T00:00:00Z');
  });

  it('updates timestamp for the modified entry', () => {
    const result = updateLeaderboard(initialEntries, { username: 'alice', points: 150 });
    const alice = result.find(e => e.username === 'alice');
    expect(alice?.updatedAt).not.toBe('2026-01-01T00:00:00Z');
  });
});
