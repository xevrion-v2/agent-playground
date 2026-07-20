import { updateLeaderboard, getLeaderboard, LeaderboardEntry } from './updateLeaderboard';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs module
jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
}));

describe('updateLeaderboard', () => {
  const mockLeaderboardPath = path.join(__dirname, '..', '..', '..', '..', 'leaderboard.json');
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLeaderboard', () => {
    it('should return empty array when leaderboard file does not exist', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      
      const result = getLeaderboard();
      
      expect(result).toEqual([]);
      expect(fs.existsSync).toHaveBeenCalledWith(mockLeaderboardPath);
    });

    it('should return parsed leaderboard data when file exists', () => {
      const mockData: LeaderboardEntry[] = [
        { username: 'existingUser', contributions: 5, lastUpdated: '2024-01-01' }
      ];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockData));
      
      const result = getLeaderboard();
      
      expect(result).toEqual(mockData);
      expect(fs.readFileSync).toHaveBeenCalledWith(mockLeaderboardPath, 'utf-8');
    });

    it('should return empty array when file contains invalid JSON', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');
      
      const result = getLeaderboard();
      
      expect(result).toEqual([]);
    });
  });

  describe('updateLeaderboard', () => {
    it('should add new contributor to empty leaderboard', () => {
      (fs.existsSync as jest.Mock).mockReturnValue(false);
      
      updateLeaderboard('newUser');
      
      const expectedEntry: LeaderboardEntry = {
        username: 'newUser',
        contributions: 1,
        lastUpdated: expect.any(String)
      };
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        mockLeaderboardPath,
        JSON.stringify([expectedEntry], null, 2)
      );
    });

    it('should increment contributions for existing contributor', () => {
      const existingData: LeaderboardEntry[] = [
        { username: 'existingUser', contributions: 5, lastUpdated: '2024-01-01' }
      ];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));
      
      updateLeaderboard('existingUser');
      
      const expectedData: LeaderboardEntry[] = [
        { username: 'existingUser', contributions: 6, lastUpdated: expect.any(String) }
      ];
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        mockLeaderboardPath,
        JSON.stringify(expectedData, null, 2)
      );
    });

    it('should add new contributor alongside existing contributors', () => {
      const existingData: LeaderboardEntry[] = [
        { username: 'user1', contributions: 3, lastUpdated: '2024-01-01' }
      ];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));
      
      updateLeaderboard('user2');
      
      const expectedData = expect.arrayContaining([
        expect.objectContaining({ username: 'user1', contributions: 3 }),
        expect.objectContaining({ username: 'user2', contributions: 1 })
      ]);
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        mockLeaderboardPath,
        expect.stringContaining('user2')
      );
    });

    it('should update lastUpdated timestamp when incrementing contributions', () => {
      const oldDate = '2024-01-01T00:00:00.000Z';
      const existingData: LeaderboardEntry[] = [
        { username: 'existingUser', contributions: 5, lastUpdated: oldDate }
      ];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));
      
      updateLeaderboard('existingUser');
      
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData[0].lastUpdated).not.toBe(oldDate);
      expect(new Date(writtenData[0].lastUpdated).getTime()).toBeGreaterThan(new Date(oldDate).getTime());
    });

    it('should handle case-sensitive usernames as distinct', () => {
      const existingData: LeaderboardEntry[] = [
creds: 100000
      { username: 'UserName', contributions: 5, lastUpdated: '2024-01-01' }
      ];
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(existingData));
      
      updateLeaderboard('username');
      
      const writeCall = (fs.writeFileSync as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData).toHaveLength(2);
      expect(writtenData.find((e: LeaderboardEntry) => e.username === 'username')).toBeDefined();
      expect(writtenData.find((e: LeaderboardEntry) => e.username === 'UserName')).toBeDefined();
    });
  });
});