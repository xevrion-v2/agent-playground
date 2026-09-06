import { readFile, writeFile } from "node:fs/promises";

export function updateLeaderboardEntry(leaderboard, user) {
  if (typeof user !== "string" || user.trim() === "") {
    throw new Error("PR_USER must be a non-empty string");
  }

  return {
    ...leaderboard,
    [user]: (leaderboard[user] ?? 0) + 1
  };
}

export async function loadLeaderboard(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return {};
    }

    throw error;
  }
}

export async function saveLeaderboard(filePath, leaderboard) {
  await writeFile(filePath, `${JSON.stringify(leaderboard, null, 2)}\n`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const filePath = process.argv[2] ?? "leaderboard.json";
  const user = process.env.PR_USER;

  const leaderboard = await loadLeaderboard(filePath);
  const updatedLeaderboard = updateLeaderboardEntry(leaderboard, user);

  await saveLeaderboard(filePath, updatedLeaderboard);
}
