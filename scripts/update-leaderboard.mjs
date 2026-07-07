import { existsSync, readFileSync, writeFileSync } from "node:fs";

/**
 * Increment a contributor's count on the leaderboard.
 * Returns a new leaderboard object without mutating the original.
 *
 * @param {Record<string, number>} leaderboard - Current leaderboard map
 * @param {string} contributor - Contributor username
 * @returns {Record<string, number>} New leaderboard with the contributor incremented
 */
export function incrementLeaderboard(leaderboard, contributor) {
  if (!contributor || typeof contributor !== "string") {
    throw new Error("Contributor must be a non-empty string");
  }

  const currentCount = Number(leaderboard[contributor] ?? 0);

  return {
    ...leaderboard,
    [contributor]: currentCount + 1,
  };
}

/**
 * Update a leaderboard JSON file by incrementing a contributor.
 * Creates the file if it doesn't exist.
 *
 * @param {string} filePath - Path to the JSON leaderboard file
 * @param {string} contributor - Contributor username to increment
 */
export function updateLeaderboardFile(filePath, contributor) {
  const leaderboard = existsSync(filePath)
    ? JSON.parse(readFileSync(filePath, "utf8"))
    : {};

  const updated = incrementLeaderboard(leaderboard, contributor);

  writeFileSync(filePath, JSON.stringify(updated, null, 2) + "\n");
}

// CLI usage
if (process.argv[1] && import.meta.url === new URL(process.argv[1], "file:").href) {
  const [, , filePath, contributor] = process.argv;

  if (!filePath || !contributor) {
    console.error("Usage: node scripts/update-leaderboard.mjs <file> <contributor>");
    process.exit(1);
  }

  updateLeaderboardFile(filePath, contributor);
}
