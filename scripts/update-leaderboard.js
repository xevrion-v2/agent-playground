#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

function updateLeaderboard(leaderboard, githubUsername) {
  if (
    leaderboard === null ||
    typeof leaderboard !== "object" ||
    Array.isArray(leaderboard)
  ) {
    throw new TypeError("Leaderboard must be a JSON object.");
  }

  if (typeof githubUsername !== "string" || githubUsername.trim() === "") {
    throw new TypeError("GitHub username must be a non-empty string.");
  }

  const currentCount = leaderboard[githubUsername] ?? 0;

  if (!Number.isInteger(currentCount) || currentCount < 0) {
    throw new TypeError(
      `Leaderboard count for ${githubUsername} must be a non-negative integer.`
    );
  }

  return {
    ...leaderboard,
    [githubUsername]: currentCount + 1
  };
}

function updateLeaderboardFile(githubUsername, leaderboardPath) {
  const leaderboard = JSON.parse(fs.readFileSync(leaderboardPath, "utf8"));
  const updatedLeaderboard = updateLeaderboard(leaderboard, githubUsername);

  fs.writeFileSync(
    leaderboardPath,
    `${JSON.stringify(updatedLeaderboard, null, 2)}\n`,
    "utf8"
  );

  return updatedLeaderboard;
}

if (require.main === module) {
  const [githubUsername, leaderboardPathArg = "leaderboard.json"] =
    process.argv.slice(2);

  if (!githubUsername) {
    console.error(
      "Usage: node scripts/update-leaderboard.js <github_username> [leaderboard_path]"
    );
    process.exitCode = 1;
  } else {
    const leaderboardPath = path.resolve(process.cwd(), leaderboardPathArg);
    const updatedLeaderboard = updateLeaderboardFile(
      githubUsername,
      leaderboardPath
    );

    console.log(
      `Updated leaderboard: ${githubUsername} now has ${updatedLeaderboard[githubUsername]} PR(s).`
    );
  }
}

module.exports = {
  updateLeaderboard,
  updateLeaderboardFile
};
