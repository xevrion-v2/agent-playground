export function updateLeaderboard(leaderboard, username) {
  if (typeof leaderboard !== "object" || leaderboard === null || Array.isArray(leaderboard)) {
    throw new TypeError("leaderboard must be an object");
  }

  if (typeof username !== "string" || username.trim() === "") {
    throw new TypeError("username must be a non-empty string");
  }

  const nextLeaderboard = { ...leaderboard };
  nextLeaderboard[username] = typeof nextLeaderboard[username] === "number"
    ? nextLeaderboard[username] + 1
    : 1;

  return nextLeaderboard;
}
