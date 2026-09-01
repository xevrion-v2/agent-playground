/**
 * Pure function to increment PR count for a contributor in the leaderboard.
 * @param {Record<string, number>} leaderboard - Existing leaderboard map
 * @param {string} username - GitHub username of the contributor
 * @returns {Record<string, number>} Updated leaderboard map
 */
export function incrementLeaderboard(leaderboard = {}, username) {
  if (!username || typeof username !== "string" || username.trim() === "") {
    throw new Error("Invalid username: username must be a non-empty string");
  }

  const cleanUser = username.trim();
  const currentCount = typeof leaderboard[cleanUser] === "number" ? leaderboard[cleanUser] : 0;

  return {
    ...leaderboard,
    [cleanUser]: currentCount + 1,
  };
}

/**
 * Updates a JSON string representation of the leaderboard.
 * @param {string} jsonString - JSON formatted string
 * @param {string} username - GitHub username
 * @returns {string} Formatted JSON string
 */
export function updateLeaderboardJson(jsonString, username) {
  let parsed = {};
  if (jsonString && jsonString.trim().length > 0) {
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      parsed = {};
    }
  }

  const updated = incrementLeaderboard(parsed, username);
  return JSON.stringify(updated, null, 2) + "\n";
}
