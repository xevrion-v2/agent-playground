import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';

// Mock fs module
vi.mock('fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn(),
  },
  existsSync: vi.fn(),
  readFileSync: vi.fn(),
  writeFileSync: vi.fn(),
}));

// Import the function to test (we'll define it inline for the test)
interface Contributor {
  username: jest.Mocked<string>;
  score: number;
  lastUpdated: string;
}

interface LeaderboardData {
  contributors: Contributor[];
  lastUpdated: string;
}

function updateLeaderboard(leaderboardPath: string, username: string, score: number): LeaderboardData {
  let data: LeaderboardData;

  if (fs.existsSync(leaderboardPath)) {
    const fileContent = fs.readFileSync(leaderboardPath, 'utf-8');
    data = JSON.parse(fileContent);
  } else {
    data = {
      contributors: [],
      lastUpdated: new Date().toISOString(),
    };
  }

  const existingContributorIndex = data.contributors.findIndex(
    (c) => c.username === username
  );

  if (existingContributorIndex >= 0) {
    data.contributors[existingContributorIndex].score += score;
    data.contributors[existingContributorIndex].lastUpdated = new Date().toISOString();
  } else {
    data.contributors.push({
      username,
      score,
      lastUpdated: new Date().toISOString(),
    });
  }

  data.lastUpdated = new Date().toISOString();

  fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));

  return data;
}

describe('updateLeaderboard', () => {
  const mockLeaderboardPath = path.join(__dirname, 'leaderboard.json');
  const mockDate = new Date('2024-01-01T00:00:00.000Z');

  beforeEach(() => {
    vi.clearAllMocks();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create a new leaderboard file if it does not exist', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    const result = updateLeaderboard(mockLeaderboardPath.constructor.name, 'newUser', 100);

    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(result.contributors).toHaveLength(1);
    expect(result.contributors[0].username).toBe('newUser');
    expect(result.contributors[0].score).toBe(100);
  });

  it('should add a new contributor to an existing leaderboard', () => {
    const existingData: LeaderboardData = {
      contributors: [{ username: 'existingUser', score: 50, lastUpdated: '2023-01-01T00:00:00.000Z' }],
      lastUpdated: '2023-01-01T00:00:00.000Z',
    };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));

    const result = updateLeaderboard(mockLeaderboardPath, 'newUser', 100);

    expect(result.contributors).toHaveLength(2);
    const newContributor = result.contributors.find((c) => c.username === 'newUser');
    expect(newContributor).toBeDefined();
    expect(newContributor!.score).toBe(100);
  });

  it('should update the score of an existing contributor', () => {
    const existingData: LeaderboardData = {
      contributors: [{ username: 'existingUser', score: 50, lastUpdated: '2023-01-01T00:00:00.000Z' }],
      lastUpdated: '2023-01-01T00:00:00.000Z',
    };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));

    const result = updateLeaderboard(mockLeaderboardPath, 'existingUser', 100);

    expect(result.contributors).toHaveLength(1);
    expect(result.contributors[0].username).toBe('existingUser');
    expect(result.contributors[0].score).toBe(150);
  });

  it('should update the lastUpdated timestamp', () => {
    const existingData: LeaderboardData = {
      contributors: [{ username: 'existingUser', score: 50, lastUpdated: '2023-01-01T00:00:00.000Z' }],
      lastUpdated: '2023-01-01T00:00:00.000Z',
    };

    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));

    const result = updateLeaderboard(mockLeaderboardPath, 'existingUser', 100);

    expect(result.lastUpdated).toBe(mockDate.toISOString());
  });
});