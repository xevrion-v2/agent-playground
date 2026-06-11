import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { updateLeaderboard } from './updateLeaderboard';

describe('updateLeaderboard', () => {
  const leaderboardPath = path.join(process.cwd(), 'leaderboard.json');
  const originalDateNow = Date.now;

  beforeEach(() => {
    // Mock Date.now to return a consistent timestamp
    Date.now = vi.fn(() => 1700000000000);
  });

  afterEach(() => {
    Date.now = originalDateNow;
    vi.restoreAllMocks();
  });

  it('should create leaderboard.json if it does not exist', () => {
    // Ensure file does not exist
    if (fs.existsSync(leaderboardPath)) {
      fs.unlinkSync(leaderboardPath);
    }

    updateLeaderboard('new-contributor', 100);

    const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    expect(data).toHaveProperty('new-contributor');
    expect(data['new-contributor']).toEqual({
      score: 100,
      lastUpdated: 1700000000000,
    });

    // Cleanup
    fs.unlinkSync(leaderboardPath);
  });

  it('should update score for an existing contributor', () => {
    // Setup initial data
    const initialData = {
      'existing-contributor': {
        score: 50,
        lastUpdated: 1600000000000,
      },
    };
    fs.writeFileSync(leaderboardPath, JSON.stringify(initialData, null, 2));

    updateLeaderboard('existing-contributor', 25);

    const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    expect(data['existing-contributor']).toEqual({
      score: 75,
      lastUpdated: 1700000000000,
    });

    // Cleanup
    fs.unlinkSync(leaderboardPath);
  });

  it('should add a new contributor to existing leaderboard', () => {
    // Setup initial data with existing contributor
    const initialData = {
      'existing-contributor': {
        score: 100,
        lastUpdated: 1600000000000,
      },
    };
    fs.writeFileSync(leaderboardPath, JSON.stringify(initialData, null, 2));

    updateLeaderboard('new-contributor', 50);

    const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    expect(data).toHaveProperty('existing-contributor');
    expect(data).toHaveProperty('new-contributor');
    expect(data['new-contributor']).toEqual({
      score: 50,
      lastUpdated: 1700000000000,
    });

    // Cleanup
    fs.unlinkSync(leaderboardPath);
  });

  it('should handle negative score updates correctly', () => {
    const initialData = {
      'existing-contributor': {
        score: 100,
        lastUpdated: 1600000000000,
      },
    };
    fs.writeFileSync(leaderboardPath, JSON.stringify(initialData, null, 2));

    updateLeaderboard('existing-contributor', -30);

    const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    expect(data['existing-contributor'].score).toBe(70);

    // Cleanup
    fs.unlinkSync(leaderboardPath);
  });

  it('should initialize score from zero for new contributor', () => {
    if (fs.existsSync(leaderboardPath)) {
      fs.unlinkSync(leaderboardPath);
    }

    updateLeaderboard('brand-new', 10);

    const data = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    expect(data['brand-new'].score).toBe(10);

    // Cleanup
    fs.unlinkSync(leaderboardPath);
  });
});