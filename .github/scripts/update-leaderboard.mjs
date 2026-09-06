import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function incrementLeaderboard(leaderboard, contributor) {
  if (!contributor) {
    throw new Error("Contributor is required");
  }

  const currentCount = Number(leaderboard[contributor] ?? 0);

  return {
    ...leaderboard,
    [contributor]: currentCount + 1,
  };
}

export function updateLeaderboardFile(filePath, contributor) {
  const leaderboard = existsSync(filePath)
    ? JSON.parse(readFileSync(filePath, "utf8"))
    : {};
  const updated = incrementLeaderboard(leaderboard, contributor);

  writeFileSync(filePath, `${JSON.stringify(updated, null, 2)}\n`);
}

const isCli = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isCli) {
  const [filePath, contributor] = process.argv.slice(2);

  if (!filePath || !contributor) {
    console.error("Usage: node .github/scripts/update-leaderboard.mjs <file> <contributor>");
    process.exit(1);
  }

  updateLeaderboardFile(filePath, contributor);
}
