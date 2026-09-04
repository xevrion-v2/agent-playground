const fs = require('fs');
const path = require('path');

// Mock fs module for controlled testing
jest.mock('fs');

describe('Leaderboard Update Script', () => {
  const leaderboardPath = path.join(__dirname, '..', 'leaderboard.json');
  
  // Import the update script functions (we'll create them in the script)
  let updateLeaderboard;
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset modules to get fresh imports
    jest.resetModules();
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('New Contributors', () => {
    test('should add a new contributor to empty leaderboard', () => {
      const emptyLeaderboard = { contributors: [] };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(emptyLeaderboard));
      
      const { addContributor } = require('../scripts/updateLeaderboard');
      
      const result = addContributor('user1', 100);
      
      expect(result.contributors).toHaveLength(1);
      expect(result.contributors[0]).toEqual({
        username: 'user1',
        score: 100,
        isNew: true
      });
    });
    
    test('should add a new contributor to existing leaderboard', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existingUser', score: 50, isNew: false }
        ]
      };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const { addContributor } = require('../scripts/updateLeaderboard');
      
      const result = addContributor('newUser', 75);
      
      expect(result.contributors).toHaveLength(2);
      expect(result.contributors[1]).toEqual({
        username: 'newUser',
        score: 75,
        isNew: true
      });
    });
    
    test('should create leaderboard file if it does not exist', () => {
      fs.existsSync.mockReturnValue(false);
      
      const { addContributor } = require('../scripts/updateLeaderboard');
      
      const result = addContributor('firstUser', 100);
      
      expect(fs.writeFileSync).toHaveBeenCalled();
      expect(result.contributors).toHaveLength(1);
      expect(result.contributors[0].username).toBe('firstUser');
    });
  });

  describe('Existing Contributors', () => {
    test('should update score for existing contributor', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existingUser', score: 50, isNew: false }
        ]
      };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const { updateContributorScore } = require('../scripts/updateLeaderboard');
      
      const result = updateContributorScore('existingUser', 25);
      
      expect(result.contributors[0].score).toBe(75);
      expect(result.contributors[0].isNew).toBe(false);
    });
    
    test('should not mark existing contributor as new when updating', () => {
      const existingLeaderboard = {
        contributors: [
          { username: 'existingUser', score: 50, isNew: false }
        ]
      };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const { updateContributorScore } = require('../scripts/updateLeaderboard');
      
      const result = updateContributorScore('existingUser', 10);
      
      expect(result.contributors[0].isNew).toBe(false);
    });
  });

  describe('Leaderboard File Operations', () => {
    test('should read existing leaderboard file', () => {
      const leaderboardData = {
        contributors: [
          { username: 'user1', score: 100, isNew: false }
        ]
      };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(leaderboardData));
      
      const { readLeaderboard } = require('../scripts/updateLeaderboard');
      
      const result = readLeaderboard();
      
      expect(fs.readFileSync).toHaveBeenCalledWith(leaderboardPath, 'utf8');
      expect(result).toEqual(leaderboardData);
    });
    
    test('should write leaderboard to file', () => {
      const { writeLeaderboard } = require('../scripts/updateLeaderboard');
      
      const data = { contributors: [] };
      writeLeaderboard(data);
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        leaderboardPath,
        JSON.stringify(data, null, 2)
      );
    });
  });
});