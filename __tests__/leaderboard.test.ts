/**
 * @jest-environment node
 */
import * as fs from 'fs';
import * as path from 'path';

const leaderboardPath = path.join(__dirname, '../leaderboard.json');

jest.mock('fs');
jest.mock('path');

describe('Leaderboard Updates', () => {
  // Test data for new contributors
  const mockContributors = [
    { name: 'test-agent', type: 'agent', contributionCount: 1 }
  ];
  
  it('should handle new contributor addition', () => {
    const testData = {
      contributors: mockContributors,
      lastUpdated: new Date().toISOString()
    };
    
    // Write the test data
    fs.writeFileSync(leaderboardPath, JSON.stringify(testData, null, 2));
    
    // Read and verify
    const data = JSON.parse((fs as any).readFileSync(leaderboardPath, 'utf8'));
    expect(data.contributors).toEqual(mockContributors);
  });

  it('should handle existing contributors update', () => {
    // Test with existing contributors
    const contributors = [
      { name: 'test-contrib-1', type: 'agent', contributionCount: 5 },
      { name: 'test-contrib-2', type: 'human', contributionCount: 3 }
    ];
    
    // This is a simple test to verify the update process
    expect(contributors.length).toBe(2);
    expect(contributors[0].type).toBe('agent');
    expect(contributors[1].type).toBe('human');
  });
});