const fs = require('node:fs');
const path = require('node:path');

const LEADERBOARD_PATH = path.resolve(__dirname, '..', 'leaderboard.json');

function normalizeEntry(entry) {
  return {
    username: entry.username,
    score: Number(entry.score || 0)
  };
}

function updateLeaderboard(currentLeaderboard, contributor) {
  const leaderboard = currentLeaderboard.map(normalizeEntry);
  const contributorScore = Number(contributor.score || 0);
  const existingEntry = leaderboard.find((entry) => entry.username === contributor.username);

  if (existingEntry) {
    existingEntry.score += contributorScore;
  } else {
    leaderboard.push({
      username: contributor.username,
      score: contributorScore
    });
  }

  return leaderboard.sort((a, b) => b.score - a.score || a.username.localeCompare(b.username));
}

function readLeaderboard(filePath = LEADERBOARD_PATH) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeLeaderboard(leaderboard, filePath = LEADERBOARD_PATH) {
  fs.writeFileSync(filePath, `${JSON.stringify(leaderboard, null, 2)}\n`);
}

function main() {
  const username = process.argv[2];
  const score = process.argv[3];

  if (!username || score == null) {
    throw new Error('Usage: node contributors/update-leaderboard.js <username> <score>');
  }

  const leaderboard = readLeaderboard();
  const updated = updateLeaderboard(leaderboard, { username, score: Number(score) });
  writeLeaderboard(updated);
}

if (require.main === module) {
  main();
}

module.exports = {
  updateLeaderboard,
  readLeaderboard,
  writeLeaderboard
};
