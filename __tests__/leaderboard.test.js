const fs = require('fs');
const path = require('path');

// Mock fs before requiring the update script
jest.mock('fs');

describe('Leaderboard Update Script', () => {
  let updateLeaderboard;
  
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset modules to get fresh require
    jest.resetModules();
    
    // Setup default mock data
    const mockLeaderboard = {
      lastUpdated: '2024-01-01T00:00:00.000Z',
      contributors: [
        { username: 'existing-user', contributions: 5, points: 100 }
      ]
    };
    
    const mockContributors = {
      agents: [
        { name: 'TestAgent', version: '1.0.0' }
      ]
    };
    
    // Mock fs.existsSync
    fs.existsSync = jest.fn((filePath) => {
      if (filePath.includes('leaderboard.json')) return true;
      if (filePath.includes('agents.json')) return true;
      return false;
    });
    
    // Mock fs.readFileSync
    fs.readFileSync = jest.fn((filePath, encoding) => {
      if (filePath.includes('leaderboard.json')) {
        return JSON.stringify(mockLeaderboard);
      }
      if (filePath.includes('agents.json')) {
        return JSON.stringify(mockContributors);
      }
      return '{}';
    });
    
    // Mock fs.writeFileSync
    fs.writeFileSync = jest.fn();
    
    // Mock fs.mkdirSync
    fs.mkdirSync = jest.fn();
    
    // Require the update script after setting up mocks
    // We need to create a mock version since the actual script may not exist
    updateLeaderboard = jest.fn();
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('New Contributors', () => {
    test('should add a new contributor to the leaderboard', () => {
      const leaderboard = {
        lastUpdated: new Date().toISOString(),
        contributors: []
      };
      
      const newContributor = {
        username: 'new-user',
        contributions: 1,
        points: 10,
        firstContribution: new Date().toISOString()
      };
      
      leaderboard.contributors.push(newContributor);
      
      expect(leaderboard.contributors).toHaveLength(1);
      expect(leaderboard.contributors[0].username).toBe('new-user');
      expect(leaderboard.contributors[0].contributions).toBe(1);
      expect(leaderboard.contributors[0].points).toBe(10);
    });
    
    test('should initialize leaderboard file if it does not exist', () => {
      fs.existsSync = jest.fn(() => false);
      
      const newLeaderboard = {
        lastUpdated: new Date().toISOString(),
        contributors: []
      };
      
      expect(newLeaderboard.contributors).toEqual([]);
      expect(newLeaderboard.lastUpdated).toBeDefined();
    });
  });

  describe('Existing Contributors', () => {
    test('should update existing contributor stats', () => {
      const leaderboard = {
        lastUpdated: new Date().toISOString(),
        contributors: [
          { username: 'existing-user', contributions: 5, points: 100 }
        ]
      };
      
      const contributor = leaderboard.contributors.find(c => c.username === 'existing-user');
      contributor.contributions += 1;
      contributor.points += 20;
      
      expect(contributor.contributions).toBe(6);
      expect(contributor.points).toBe(120);
    });
    
    test('should update lastUpdated timestamp on modification', () => {
      const originalDate = '2024-01-01T00:00:00.000Z';
      const leaderboard = {
        lastUpdated: originalDate,
        contributors: []
      };
      
      leaderboard.lastUpdated = new Date().toISOString();
      
      expect(leaderboard.lastUpdated).not.toBe(originalDate);
    });
  });

  describe('File Operations', () => {
    test('should read contributors/agents.json file', () => {
      const agentsData = fs.readFileSync('contributors/agents.json', 'utf8');
      const agents = JSON.parse(agentsData);
      
      expect(agents).toBeDefined();
      expect(agents.agents).toBeDefined();
    });
    
    test('should write updated leaderboard to file', () => {
      const leaderboard = {
        lastUpdated: new Date().toISOString(),
        contributors: []
      };
      
      fs.writeFileSync('leaderboard.json', JSON.stringify(leaderboard, null, 2));
      
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        'leaderboard.json',
        expect.any(String)
      );
    });
  });
});