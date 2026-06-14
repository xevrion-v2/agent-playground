/**
 * Leaderboard update script.
 *
 * Increments a contributor's PR count in `leaderboard.json`. The pure
 * `incrementContributor` function is exported so it can be unit tested without
 * touching the filesystem; the CLI wrapper wires it to disk for CI use.
 *
 * CLI usage:
 *   node scripts/update-leaderboard.mjs <github-username> [leaderboard-path]
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

/**
 * Return a new leaderboard with `user`'s count incremented by one.
 *
 * Pure: the input object is never mutated. New contributors start at 1;
 * existing contributors are incremented. Other entries are preserved.
 *
 * @param {Record<string, number>} leaderboard - Current counts (may be empty).
 * @param {string} user - GitHub username to increment.
 * @returns {Record<string, number>} A new leaderboard object.
 */
export function incrementContributor(leaderboard, user) {
  if (typeof user !== "string" || user.length === 0) {
    throw new Error("user must be a non-empty string");
  }
  const current = leaderboard?.[user] ?? 0;
  return { ...leaderboard, [user]: current + 1 };
}

/**
 * Read a leaderboard JSON file, returning `{}` when it is missing or empty.
 *
 * @param {string} path
 * @returns {Record<string, number>}
 */
export function readLeaderboard(path) {
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, "utf8").trim();
  return raw ? JSON.parse(raw) : {};
}

/**
 * Write a leaderboard to disk as pretty-printed JSON with a trailing newline,
 * matching the format previously produced by `jq`.
 *
 * @param {string} path
 * @param {Record<string, number>} leaderboard
 */
export function writeLeaderboard(path, leaderboard) {
  writeFileSync(path, `${JSON.stringify(leaderboard, null, 2)}\n`);
}

// Run as a CLI only when invoked directly (not when imported by tests).
if (import.meta.url === `file://${process.argv[1]}`) {
  const user = process.argv[2];
  const path = process.argv[3] ?? "leaderboard.json";
  if (!user) {
    console.error("usage: node scripts/update-leaderboard.mjs <github-username> [path]");
    process.exit(1);
  }
  const updated = incrementContributor(readLeaderboard(path), user);
  writeLeaderboard(path, updated);
  console.log(`Incremented ${user} -> ${updated[user]}`);
}
