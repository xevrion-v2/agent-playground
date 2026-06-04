import { describe, it, expect } from 'vitest';
import leaderboard from '../leaderboard.json';

describe('Leaderboard', () => {
  it('should be a valid JSON object', () => {
    expect(typeof leaderboard).toBe('object');
    expect(leaderboard).not.toBeNull();
  });

  it('should contain contributor entries', () => {
    const entries = Object.entries(leaderboard);
    expect(entries.length).toBeGreaterThan(0);
  });

  it('should have string keys (usernames)', () => {
    const keys = Object.keys(leaderboard);
    keys.forEach(key => {
      expect(typeof key).toBe('string');
      expect(key.length).toBeGreaterThan(0);
    });
  });

  it('should have number values (scores)', () => {
    const values = Object.values(leaderboard);
    values.forEach(value => {
      expect(typeof value).toBe('number');
      expect(value).toBeGreaterThan(0);
    });
  });

  it('should have valid contributor scores', () => {
    const entries = Object.entries(leaderboard);
    entries.forEach(([username, score]) => {
      expect(score).toBeGreaterThanOrEqual(1);
      expect(score).toBeLessThanOrEqual(1000);
    });
  });

  it('should contain known contributors', () => {
    expect(leaderboard).toHaveProperty('KHHH2312');
    expect(leaderboard).toHaveProperty('Ajithkelangath');
    expect(leaderboard).toHaveProperty('kouyouqi123');
  });

  it('should have correct scores for known contributors', () => {
    expect(leaderboard['KHHH2312']).toBe(19);
    expect(leaderboard['Ajithkelangath']).toBe(15);
    expect(leaderboard['kouyouqi123']).toBe(12);
  });
});
