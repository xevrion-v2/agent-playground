const fs = require('fs');
const path = require('path');

// Mock fs for controlled testing
jest.mock('fs');

describe('Leaderboard Update Script', () => {
  const leaderboardPath = path.join(__dirname, 'leaderboard.json');
  
  // Sample test data
  const existingLeaderboard = {
    contributors: [
      {
        username: 'existingUser',
        contributions: 5,
        lastUpdated: '2024-01-01T00:00:00.000Z'
      }
    ],
    totalContributions: 5,
    lastUpdated: '2024-01-01T00:00:00.000Z'
  };

  beforeEach(() => {
    // Clear all mocks before each test lump
    jest.clearAllMocks();
    
    // Reset fs mock implementations
    fs.existsSync = jest.fn();
    fs.readFileSync = jest.fn();
    fs.writeFileSync = jest.fn();
  });

  describe('New Contributor', () => {
    test('should add a new contributor to empty leaderboard', () => {
      // Arrange
      const emptyLeaderboard = { contributors: [], totalContributions: 0 };
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(emptyLeaderboard));
      
      const newContributor = { username: 'newUser', contributions: 3 };
      
      // Act
      updateLeaderboard(newContributor);
      
      // Assert
      const writeCall = fs.writeFileSync.mock.calls[0];
      const updatedData = JSON.parse(writeCall[1]);
      
      expect(updatedData.contributors).toHaveLength(1);
      expect(updatedData.contributors[0].username).toBe('newUser');
      expect(updatedData.contributors[0].contributions).toBe(3);
      expect(updatedData.totalContributions).toBe(3);
      expect(updatedData.contributors[0].lastUpdated).toBeDefined();
    });

    test('should add a new contributor to existing leaderboard', () => {
      // Arrange
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const newContributor = { username: 'anotherUser', contributions: 2 };
      
      // Act
      updateLeaderboard(newContributor);
      
      // Assert
      const writeCall = fs.writeFileSync.mock.calls[0];
      const updatedData = JSON.parse(writeCall[1]);
      
      expect(updatedData.contributors).toHaveLength(2);
      expect(updatedData.contributors.find(c => c.username === 'anotherUser').contributions).toBe(2);
      expect(updatedData.totalContributions).toBe(7);
    });
  });

  describe('Existing Contributor', () => {
    test('should update existing contributor contributions', () => {
      // Arrange
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const updatedContributor = { username: 'existingUser', contributions: 3 };
      
      // Act
      updateLeaderboard(updatedContributor);
      
      // Assert
      const writeCall = fs.writeFileSync.mock.calls[0];
      const updatedData = JSON.parse(writeCall[1]);
      
      expect(updatedData.contributors).toHaveLength(1);
      expect(updatedData.contributors[0].contributions).toBe(8); // 5 + 3
      expect(updatedData.totalContributions).toBe(8);
    });

    test('should update lastUpdated timestamp for existing contributor', () => {
      // Arrange
      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockReturnValue(JSON.stringify(existingLeaderboard));
      
      const beforeUpdate = new Date().toISOString();
      const updatedContributor = { username: 'existingUser', contributions: 1 };
      
      // Act
      updateLeaderboard(updatedContributor);
      
      // Assert
      const writeCall = fs.writeFileSync.mock.calls[0];
      const updatedData = JSON.parse(writeCall[1]);
      
      expect(new Date(updatedData.contributors[0].lastUpdated)).toBeInstanceOf(Date);
      expect(new Date(updatedData.contributors[0].lastUpdated) >= new Date(beforeUpdate)).toBe(true);
    });
  });

  describe('Leaderboard File Operations', () => {
    test('should create new leaderboard file if it does not exist', () => {
      // Arrange
      fs.existsSync.mockReturnValue(false);
      
      const newContributor = { username: 'firstUser', contributions: 1 };
      
      // Act
      updateLeaderboard(newContributor);
      
      // Assert
      expect(fs.writeFileSync).toHaveBeenCalled();
      const writeCall = fs.writeFileSync.mock.calls[0];
      expect(writeCall[0]).toBe(leaderboardPath);
    });
  });
});

// Helper function to simulate leaderboard update logic
function updateLeaderboard(contributor) {
  let data = { contributors: [], totalContributions: 0 };
  
  if (fs.existsSync(leaderboardPath)) {
    const fileContent = fs.readFileSync(leaderboardPath, 'utf8');
    data = JSON.parse(fileContent);
  }
  
  const existingIndex = data.contributors.findIndex(c => c.username === contributor.username);
  
  if (existingIndex >= 0) {
    data.contributors[existingIndex].contributions += contributor.contributions;
    data.contributors[existingIndex].lastUpdated = new Date().toISOString();
  } else {
    data.contributors.push({
      username: contributor.username,
      contributions: contributor.contributions,
      lastUpdated: new Date().toISOString()
    });
  }
  
  data.totalContributions = data.contributors.reduce((sum, c) => sum + c.contributions, 0);
  data.lastUpdated = new Date().toISOString();
  
  fs.writeFileSync(leaderboardPath, JSON.stringify(data, null, 2));
}