#!/usr/bin/env node
/**
 * Leaderboard increment logic extracted for reuse and testing.
 *
 * Usage:
 *   node scripts/update_leaderboard.cjs <username> [increment]
 *
 * When called from a workflow this file is imported and the
 * exported helpers are used directly.
 */

const fs = require("fs");
const path = require("path");

const LEADERBOARD_PATH = path.resolve(__dirname, "..", "leaderboard.json");

/**
 * Read and parse the leaderboard JSON file.
 * @param {string} [filePath] – override path (useful for tests)
 * @returns {Record<string, number>}
 */
function readLeaderboard(filePath) {
  const target = filePath || LEADERBOARD_PATH;
  const raw = fs.readFileSync(target, "utf-8");
  return JSON.parse(raw);
}

/**
 * Increment a contributor's count on the leaderboard.
 *
 * @param {Record<string, number>} board – current leaderboard object
 * @param {string} username              – GitHub username to increment
 * @param {number} [increment=1]         – amount to add
 * @returns {Record<string, number>}     – mutated board (same reference)
 */
function incrementContributor(board, username, increment = 1) {
  if (typeof username !== "string" || username.trim() === "") {
    throw new Error("username must be a non-empty string");
  }
  if (typeof increment !== "number" || increment < 1) {
    throw new Error("increment must be a positive number");
  }
  board[username] = (board[username] || 0) + increment;
  return board;
}

/**
 * Write the leaderboard object back to disk.
 * @param {Record<string, number>} board
 * @param {string} [filePath]
 */
function writeLeaderboard(board, filePath) {
  const target = filePath || LEADERBOARD_PATH;
  fs.writeFileSync(target, JSON.stringify(board, null, 2) + "\n", "utf-8");
}

/**
 * High-level helper: read → increment → write.
 * @param {string} username
 * @param {number} [increment=1]
 * @param {string} [filePath]
 */
function updateLeaderboard(username, increment = 1, filePath) {
  const board = readLeaderboard(filePath);
  incrementContributor(board, username, increment);
  writeLeaderboard(board, filePath);
  return board;
}

module.exports = {
  readLeaderboard,
  incrementContributor,
  writeLeaderboard,
  updateLeaderboard,
  LEADERBOARD_PATH,
};

// CLI entry-point
if (require.main === module) {
  const [, , username, incArg] = process.argv;
  if (!username) {
    console.error("Usage: node scripts/update_leaderboard.cjs <username> [increment]");
    process.exit(1);
  }
  const result = updateLeaderboard(username, incArg ? Number(incArg) : 1);
  console.log(`Leaderboard updated for ${username}:`, result[username]);
}
