/**
 * Leaderboard update utility.
 *
 * Reads the contributor leaderboard, adds or updates contributor counts,
 * and returns the updated leaderboard. Can be used as a module or run
 * directly from the command line.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The leaderboard maps GitHub usernames to their contribution count.
 */
export type Leaderboard = Record<string, number>;

/**
 * Default path to the leaderboard JSON file, relative to the repo root.
 */
export const DEFAULT_LEADERBOARD_PATH = resolve(
  import.meta.dirname,
  "..",
  "leaderboard.json"
);

/**
 * Read the leaderboard from a JSON file.
 *
 * @param filePath - Path to the leaderboard JSON file.
 * @returns The parsed leaderboard object.
 * @throws If the file cannot be read or parsed.
 */
export function readLeaderboard(filePath: string = DEFAULT_LEADERBOARD_PATH): Leaderboard {
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Leaderboard;
}

/**
 * Write the leaderboard to a JSON file with stable key ordering.
 *
 * @param leaderboard - The leaderboard object to write.
 * @param filePath - Path to write the JSON file to.
 */
export function writeLeaderboard(
  leaderboard: Leaderboard,
  filePath: string = DEFAULT_LEADERBOARD_PATH
): void {
  // Sort by contribution count descending, then alphabetically for ties
  const sorted = Object.fromEntries(
    Object.entries(leaderboard).sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
  );
  writeFileSync(filePath, JSON.stringify(sorted, null, 2) + "\n", "utf-8");
}

/**
 * Add a contribution to a contributor in the leaderboard.
 *
 * If the contributor is new, they are added with a count of 1.
 * If the contributor already exists, their count is incremented by 1.
 *
 * @param leaderboard - The current leaderboard object (not mutated).
 * @param username - The GitHub username of the contributor.
 * @param increment - The number of contributions to add. Defaults to 1.
 * @returns A new leaderboard object with the updated count.
 */
export function addContribution(
  leaderboard: Leaderboard,
  username: string,
  increment: number = 1
): Leaderboard {
  if (!username || typeof username !== "string") {
    throw new Error("Username must be a non-empty string.");
  }
  if (increment < 0 || !Number.isInteger(increment)) {
    throw new Error("Increment must be a non-negative integer.");
  }

  const current = leaderboard[username] ?? 0;
  return {
    ...leaderboard,
    [username]: current + increment
  };
}

/**
 * Add contributions from multiple contributors at once.
 *
 * @param leaderboard - The current leaderboard object.
 * @param usernames - Array of GitHub usernames to increment.
 * @returns A new leaderboard object with all contributors updated.
 */
export function addContributions(
  leaderboard: Leaderboard,
  usernames: string[]
): Leaderboard {
  let result = { ...leaderboard };
  for (const username of usernames) {
    result = addContribution(result, username);
  }
  return result;
}

/**
 * Get the top N contributors from the leaderboard.
 *
 * @param leaderboard - The leaderboard object.
 * @param n - The number of top contributors to return.
 * @returns Array of [username, count] pairs sorted by count descending.
 */
export function getTopContributors(
  leaderboard: Leaderboard,
  n: number = 10
): Array<[string, number]> {
  return Object.entries(leaderboard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

/**
 * Get the total number of contributions across all contributors.
 *
 * @param leaderboard - The leaderboard object.
 * @returns The sum of all contribution counts.
 */
export function getTotalContributions(leaderboard: Leaderboard): number {
  return Object.values(leaderboard).reduce((sum, count) => sum + count, 0);
}

// CLI entry point: node updateLeaderboard.ts <username> [username2...]
if (import.meta.url === `file://${process.argv[1]}`) {
  const usernames = process.argv.slice(2);
  if (usernames.length === 0) {
    console.error("Usage: tsx updateLeaderboard.ts <username> [username2...]");
    process.exit(1);
  }

  const leaderboard = readLeaderboard();
  const updated = addContributions(leaderboard, usernames);
  writeLeaderboard(updated);

  console.log(`Updated leaderboard with ${usernames.length} contributor(s).`);
  console.log(`Total contributors: ${Object.keys(updated).length}`);
  console.log(`Total contributions: ${getTotalContributions(updated)}`);
}
