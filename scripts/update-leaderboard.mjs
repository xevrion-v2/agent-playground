import fs from "node:fs";
import { pathToFileURL } from "node:url";

export function updateLeaderboard(leaderboard, username) {
  if (!leaderboard || typeof leaderboard !== "object" || Array.isArray(leaderboard)) {
    throw new TypeError("leaderboard must be an object");
  }

  if (typeof username !== "string" || username.trim() === "") {
    throw new TypeError("username must be a non-empty string");
  }

  return {
    ...leaderboard,
    [username]: (leaderboard[username] ?? 0) + 1
  };
}

function run() {
  const [, , leaderboardPath, username] = process.argv;

  if (!leaderboardPath || !username) {
    throw new Error("usage: node scripts/update-leaderboard.mjs <path> <username>");
  }

  const leaderboard = fs.existsSync(leaderboardPath)
    ? JSON.parse(fs.readFileSync(leaderboardPath, "utf8"))
    : {};

  const updated = updateLeaderboard(leaderboard, username);
  fs.writeFileSync(leaderboardPath, `${JSON.stringify(updated, null, 2)}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  run();
}
