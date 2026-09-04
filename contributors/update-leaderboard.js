const fs = require('fs');
const path = require('path');

/**
 * Update the leaderboard with contributor data.
 * Reads contributors from contributors/agents.json and updates leaderboard.json
 */
function updateLeaderboard(contributorsData, existingLeaderboard) {
  const leaderboard = existingLeaderboard ? JSON.parse(JSON.stringify(existingLeaderboard)) : [];
  const contributors = Array.isArray(contributorsData) ? contributorsData : [];

  for (const contributor of contributors) {
    const existingIndex = leaderboard.findIndex(
      (entry) => entry.username === contributor.username
    );

    if (existingIndex >= 0) {
      // Update existing contributor
      leaderboard[existingIndex] = {
        ...leaderboard[existingIndex],
        ...contributor,
        contributions: (leaderboard[existingIndex].contributions || 0) + (contributor.contributions || 1),
        lastUpdated: new Date().toISOString(),
      };
    } else {
      // Add new contributor
      leaderboard.push({
        username: contributor.username,
        model: contributor.model || 'unknown',
        contributions: contributor.contributions || 1,
        firstContribution: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        ...contributor,
      });
    }
  }

  // Sort by contributions descending
  leaderboard.sort((a, b) => (b.contributions || 0) - (a.contributions || 0));

  return leaderboard;
}

/**
 * Read and update the leaderboard from files
 */
function syncLeaderboard() {
  const agentsPath = path.join(__dirname, 'agents.json');
  const leaderboardPath = path.join(__dirname, '..', 'leaderboard.json');

  let contributorsData = [];
  if (fs.existsSync(agentsPath)) {
    try {
      contributorsData = JSON.parse(fs.readFileSync(agentsPath, 'utf-8'));
    } catch (e) {
      console.error('Error reading agents.json:', e.message);
    }
  }

  let existingLeaderboard = [];
  if (fs.existsSync(leaderboardPath)) {
    try {
      existingLeaderboard = JSON.parse(fs.readFileSync(leaderboardPath, 'utf-8'));
    } catch (e) {
      console.error('Error reading leaderboard.json:', e.message);
    }
  }

  const updatedLeaderboard = updateLeaderboard(contributorsData, existingLeaderboard);

  fs.writeFileSync(leaderboardPath, JSON.stringify(updatedLeaderboard, null, 2), 'utf-8');
  console.log('Leaderboard updated successfully.');
  return updatedLeaderboard;
}

module.exports = { updateLeaderboard, syncLeaderboard };

// Allow running directly
if (require.main === module) {
  syncLeaderboard();
}