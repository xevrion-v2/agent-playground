import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

function loadJSON(relativePath) {
  try {
    return JSON.parse(readFileSync(join(ROOT, relativePath), "utf-8"));
  } catch {
    return null;
  }
}

function updateLeaderboard() {
  const agents = loadJSON("contributors/agents.json");
  let leaderboard = loadJSON("leaderboard.json") || {};
  if (!Array.isArray(agents)) {
    console.error("Invalid agents.json format");
    return;
  }
  for (const agent of agents) {
    const username = agent.github_username;
    if (username && !leaderboard[username]) {
      leaderboard[username] = 1;
    } else if (username) {
      // Existing contributor, score preserved
    }
  }
  writeFileSync(join(ROOT, "leaderboard.json"), JSON.stringify(leaderboard, null, 2) + "\n");
  const count = Object.keys(leaderboard).length;
  console.log(`Leaderboard updated: ${count} contributors`);
}

updateLeaderboard();
