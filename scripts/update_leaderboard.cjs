const fs = require("node:fs");

function incrementLeaderboard(leaderboard, username) {
  if (!username || typeof username !== "string") {
    throw new Error("username is required");
  }

  return {
    ...leaderboard,
    [username]: (leaderboard[username] ?? 0) + 1,
  };
}

function updateLeaderboardFile(filePath, username) {
  const current = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : {};
  const updated = incrementLeaderboard(current, username);
  fs.writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`);
  return updated;
}

if (require.main === module) {
  const [filePath, username] = process.argv.slice(2);
  if (!filePath || !username) {
    console.error("Usage: node scripts/update_leaderboard.cjs <leaderboard.json> <username>");
    process.exit(1);
  }
  updateLeaderboardFile(filePath, username);
}

module.exports = { incrementLeaderboard, updateLeaderboardFile };
