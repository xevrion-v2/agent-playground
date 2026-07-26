import fs from "node:fs";

export function incrementLeaderboard(leaderboard, contributor) {
  if (!contributor || typeof contributor !== "string") {
    throw new Error("contributor is required");
  }

  return {
    ...leaderboard,
    [contributor]: (leaderboard[contributor] ?? 0) + 1
  };
}

export function updateLeaderboardFile(filePath, contributor) {
  const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "{}";
  const leaderboard = raw.trim() ? JSON.parse(raw) : {};
  const updated = incrementLeaderboard(leaderboard, contributor);

  fs.writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`);

  return updated;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , filePath = "leaderboard.json", contributor = process.env.PR_USER] = process.argv;
  updateLeaderboardFile(filePath, contributor);
}
