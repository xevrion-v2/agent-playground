import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { updateLeaderboard } from './updateLeaderboard';

describe('updateLeaderboard', () => {
  const testLeaderboardPath = path.join(__dirname, 'test-leaderboard.json');
  const originalLeaderboardPath = path.join(__dirname, '..', '..', '..', '..', '..', 'leaderboard.json');
  
  beforeEach(() => {
    // Mock the leaderboard file path for testing
    vi.mock('./updateLeaderboard', async () => {
      const actual = await vi.importActual('./updateLeaderboard');
      return {
        ...actual,
        LEADERBOARD_PATH: testLeaderboardPath,
      };
    });
  });

  afterEach(() => {
    // Clean up test file
    if (fs.existsSync(testLeaderboardPath)) {
      fs.unlinkSync(testLeaderboardPath);
    }
    vi.clearAllMocks();
  });

  it('should create a new leaderboard entry for a new contributor', () => {
    const contributor = 'new-contributor';
    const points = 100;
    
    updateLeaderboard(contributor, points);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard[contributor]).toBe(points);
  });

  it('should update points for an existing contributor', () => {
    const contributor = 'existing-contributor';
    const initialPoints = 100;
    const additionalPoints = 50;
    
    // Set up initial state
    fs.writeFileSync(testLeaderboardPath, JSON.stringify({ [contributor]: initialPoints }));
    
    updateLeaderboard(contributor, additionalPoints);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard[contributor]).toBe(initialPoints + additionalPoints);
  });

  it('should initialize leaderboard file if it does not exist', () => {
    const contributor = 'first-contributor';
    const points = 200;
    
    // Ensure file does not exist
    if (fs.existsSync(testLeaderboardPath)) {
      fs.unlinkSync(testLeaderboardPath);
    }
    
    updateLeaderboard(contributor, points);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard).toHaveProperty(contributor);
    expect(leaderboard[contributor]).toBe(points);
  });

  it('should handle multiple contributors correctly', () => {
    const contributors = [
      { name: 'alice', points: 100 },
      { name: 'bob', points: 150 },
      { name: 'charlie', points: 75 },
    ];
    
    contributors.forEach(({ name, points }) => {
      updateLeaderboard(name, points);
    });
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    
    expect(Object.keys(leaderboard)).toHaveLength(3);
    expect(leaderboard['alice']).toBe(100);
    expect(leaderboard['bob']).toBe(150);
    expect(leaderboard['charlie']).toBe(75);
  });

  it('should accumulate points correctly when called multiple times for same contributor', () => {
    const contributor = 'repeated-contributor';
    
    updateLeaderboard(contributor, 50);
    updateLeaderboard(contributor, 30);
    updateLeaderboard(contributor, 20);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard[contributor]).toBe(100);
  });

  it('should handle zero points', () => {
    const contributor = 'zero-points';
    
    updateLeaderboard(contributor, 0);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard[contributor]).toBe(0);
  });

  it('should handle negative points (penalty)', () => {
    const contributor = 'penalized-contributor';
    
    updateLeaderboard(contributor, 100);
    updateLeaderboard(contributor, -30);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard[contributor]).toBe(70);
  });

  it('should preserve other contributors data when updating one', () => {
    // Set up initial state with multiple contributors
    const initialData = {
      'existing-1': 100,
      'existing-2': 200,
    };
    fs.writeFileSync(testLeaderboardPath, JSON.stringify(initialData));
    
    updateLeaderboard('new-contributor', 150);
    
    const leaderboard = JSON.parse(fs.readFileSync(testLeaderboardPath, 'utf-8'));
    expect(leaderboard['existing-1']).toBe(100);
    expect(leaderboard['existing-2']).toBe(200);
    expect(leaderboard['new-contributor']).toBe(150);
  });
});