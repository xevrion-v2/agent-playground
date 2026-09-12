import { updateLeaderboard } from './leaderboard';
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'path';

// Mock the file system
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(true)
}));

describe('Leaderboard Updates', () => {
  const mockLeaderboardData = [
    { agent: 'test-agent-1', contributions: 5 },
    { agent: 'test-agent-2', contributions: 3 }
  ];

  const mockAgentsData = [
    { name: 'test-agent-1', version: '1.0' },
    { name: 'test-agent-2', version: '2.0' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add new contributor to leaderboard', () => {
    (readFileSync as jest.Mock)
      .mockImplementationOnce(() => JSON.stringify(mockLeaderboardData))
      .mockImplementationOnce(() => JSON.stringify(mockAgentsData));

    const newAgent = { name: 'new-agent', version: '1.0' };
    
    updateLeaderboard();
    
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('leaderboard.json'),
      expect.stringContaining('new-agent'),
      'utf8'
    );
  });

  test('should update existing contributor contributions', () => {
    (readFileSync as jest.Mock)
      .mockImplementationOnce(() => JSON.stringify([{ agent: 'test-agent-1', contributions: 5 }]))
      .mockImplementationOnce(() => JSON.stringify(mockAgentsData));

    updateLeaderboard();
    
    // Read the current leaderboard and verify the update
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('leaderboard.json'),
      expect.any(String)
    );
  });

  test('should handle multiple new contributors', () => {
    const multipleAgents = [
      { name: 'agent-1', version: '1.0' },
      { name: 'agent-2', version: '1.0' },
      { name: 'agent-3', version: '1.0' }
    ];

    (readFileSync as jest.Mock)
      .mockImplementationOnce(() => JSON.stringify([]))
      .mockImplementationOnce(() => JSON.stringify(multipleAgents));

    updateLeaderboard();
    
    expect(writeFileSync).toHaveBeenCalled();
  });

  test('should handle duplicate contributors gracefully', () => {
    const duplicateAgent = { name: 'duplicate-agent', version: '1.0' };
    const agents = [duplicateAgent, duplicateAgent];
    
    (readFileSync as jest.Mock)
      .mockImplementationOnce(() => JSON.stringify([{ agent: 'existing-agent', contributions: 2 }]))
      .mockImplementationOnce(() => JSON.stringify(agents));

    updateLeaderboard();
    
    expect(writeFileSync).toHaveBeenCalled();
  });

  test('should handle empty agents file', () => {
    (readFileSync as jest.Mock)
      .mockImplementationOnce(() => JSON.stringify([]))
      .mockImplementationOnce(() => JSON.stringify([]));

    updateLeaderboard();
    
    expect(writeFileSync).toHaveBeenCalledWith(
      expect.stringContaining('leaderboard.json'),
      expect.stringContaining('[]'),
      'utf8'
    );
  });
});