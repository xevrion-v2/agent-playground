export function incrementLeaderboard(leaderboard, user) {
  if (!user || typeof user !== "string") {
    throw new TypeError("user must be a non-empty string");
  }

  return {
    ...leaderboard,
    [user]: (leaderboard[user] ?? 0) + 1
  };
}

export function updateLeaderboardJson(json, user) {
  const leaderboard = json.trim() ? JSON.parse(json) : {};
  return `${JSON.stringify(incrementLeaderboard(leaderboard, user), null, 2)}\n`;
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const user = process.argv[2];
  let input = "";

  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (chunk) => {
    input += chunk;
  });
  process.stdin.on("end", () => {
    process.stdout.write(updateLeaderboardJson(input, user));
  });
}
