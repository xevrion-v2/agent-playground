const fs = require('fs');
const path = require('path');

const LEADERBOARD_PATH = path.join(__dirname, '..', 'leaderboard.json');

function readLeaderboard() {
  if (!fs.existsSync(LEADERBOARD_PATH)) {
    return [];
  }
  const data = fs.readFileSync(LEADERBOARD_PATH, 'utf8');
  return JSON.parse(data);
}

function writeLeaderboard(data) {
  fs.writeFileSync(LEADERBOARD_PATH, JSON.stringify(data, null, 2));
}

function updateLeaderboard(contributorName, amount) {
  const leaderboard = readLeaderboard();
  const existing = leaderboard.find(entry => entry.name === contributorName);
  if (existing) {
    existing.amount += amount;
  } else {
    leaderboard.push({ name: contributorName, amount });
  }
  leaderboard.sort((a, b) => b.amount - a.amount);
  writeLeaderboard(leaderboard);
  return leaderboard;
}

describe('Leaderboard Updates', () => {
  beforeEach(() => {
    writeLeaderboard([]);
  });

  test('should add new contributor', () => {
    updateLeaderboard('Alice', 100);
    const leaderboard = readLeaderboard();
    expect(leaderboard).toHaveLength(1);
    expect(leaderboard[0]).toEqual({ name: 'Alice', amount: 100 });
  });

  test('should update existing contributor', () => {
    updateLeaderboard('Bob', 50);
    updateLeaderboard('Bob', 30);
    const leaderboard = readLeaderboard();
    expect(leaderboard[0].amount).toBe(80);
  });

  test('should handle empty leaderboard', () => {
    const leaderboard = readLeaderboard();
    expect(leaderboard).toHaveLength(0);
  });

  test('should sort by score descending', () => {
    updateLeaderboard('Charlie', 10);
    updateLeaderboard('Alice', 100);
    updateLeaderboard('Bob', 50);
    const leaderboard = readLeaderboard();
    expect(leaderboard[0].name).toBe('Alice');
    expect(leaderboard[1].name).toBe('Bob');
    expect(leaderboard[2].name).toBe('Charlie');
  });
});