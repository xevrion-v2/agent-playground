const fs = require('fs');
const path = require('path');

// Mock fs module
jest.mock('fs');

describe('Leaderboard Update Script', () => {
  const leaderboardPath = path.join(__dirname, '..', 'leaderboard.json');
  
  // Mock console methods to keep test output clean
  let consoleLogSpy;
  let consoleErrorSpy;
  
  beforeEach(() => {
    jest.clearAllMocks();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });
  
  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe('New contributor', () => {
    test('should add new contributor to empty leaderboard', () => {
      const emptyLeaderboard = { contributors: [] };
      fs.readFileSync.mockReturnValue(JSON.stringify(emptyLeaderboard));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('newuser', 100);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors).toHaveLength(1);
      expect(writtenData.contributors[0]).toEqual({
        username: 'newuser',
        score: 100
      });
    });
    
    test('should add new contributor to existing leaderboard', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existinguser', score: 50 }
        ]
      };
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('newuser', 75);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors).toHaveLength(2);
      expect(writtenData.contributors).toContainEqual({
        username: 'newuser',
        score: 75
      });
    });
  });

  describe('Existing contributor', () => {
    test('should update score for existing contributor', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existinguser', score: 50 }
        ]
      };
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('existinguser', 25);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors).toHaveLength(1);
      expect(writtenData.contributors[0]).toEqual({
        username: 'existinguser',
        score: 75
      });
    });
    
    test('should handle multiple updates to same contributor', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existinguser', score: 50 }
        ]
      };
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('existinguser', 10);
      updateLeaderboard('existinguser', 20);
      
      const writeCall = fs.writeFileSync.mock.calls[1];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors[0].score).toBe(80);
    });
  });

  describe('Error handling', () => {
    test('should handle missing leaderboard file', () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error('ENOENT: no such file or directory');
      });
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      
      expect(() => updateLeaderboard('user', 100)).toThrow();
    });
    
    test('should handle invalid JSON in leaderboard file', () => {
      fs.readFileSync.mockReturnValue('invalid json');
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      
      expect(() => updateLeaderboard('user', 100)).toThrow();
    });
  });

  describe('Edge cases', () => {
    test('should handle zero score', () => {
      fs.readFileSync.mockReturnValue(JSON.stringify({ contributors: [] }));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('user', 0);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors[0].score).toBe(0);
    });
    
    test('should handle negative score', () => {
      fs.readFileSync.mockReturnValue(JSON.stringify({ contributors: [] }));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('user', -10);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors[0].score).toBe(-10);
    });
    
    test('should handle special characters in username', () => {
      fs.readFileSync.mockReturnValue(JSON.stringify({ contributors: [] }));
      
      const updateLeaderboard = require('../scripts/updateLeaderboard');
      updateLeaderboard('user-name_123', 100);
      
      const writeCall = fs.writeFileSync.mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      
      expect(writtenData.contributors[0].username).toBe('user-name_123');
    });
  });
});