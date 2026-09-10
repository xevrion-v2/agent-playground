import fs from "node:fs";

export function incrementLeaderboard(leaderboard, username) {
  if (!username || typeof username !== "string") {
    throw new Error("username is required");
  }

  return {
    ...leaderboard,
    [username]: (leaderboard[username] ?? 0) + 1
  };
}

export function updateLeaderboardFile(filePath, username) {
  const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "{}";
  const leaderboard = JSON.parse(raw);
  const updated = incrementLeaderboard(leaderboard, username);

  fs.writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`);
  return updated;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  updateLeaderboardFile("leaderboard.json", process.env.PR_USER);
}
