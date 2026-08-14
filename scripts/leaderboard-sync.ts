import { readFileSync, writeFileSync, existsSync } from "fs";

interface Leaderboard {
  [username: string]: number;
}

interface AgentEntry {
  github_username: string;
  model: string;
  version?: string;
  pr_number: number;
  issue_number: number;
}

interface AgentsFile {
  agents: AgentEntry[];
  last_updated: string;
  total_contributions: number;
}

/**
 * Update the leaderboard based on new agent contributions.
 * Each agent in the agents file gets +1 on the leaderboard.
 * If the username is new, it starts at 1.
 *
 * @returns the updated leaderboard object.
 */
export function updateLeaderboard(
  leaderboard: Leaderboard,
  agentsFile: AgentsFile,
): Leaderboard {
  const updated = { ...leaderboard };

  for (const agent of agentsFile.agents) {
    const username = agent.github_username;
    if (updated[username] !== undefined) {
      updated[username] += 1;
    } else {
      updated[username] = 1;
    }
  }

  return updated;
}

/**
 * Load leaderboard from disk. Returns empty object if file missing.
 */
export function loadLeaderboard(filePath: string): Leaderboard {
  if (!existsSync(filePath)) {
    return {};
  }

  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Leaderboard;
}

/**
 * Load agents file from disk.
 */
export function loadAgentsFile(filePath: string): AgentsFile {
  const raw = readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as AgentsFile;
}

/**
 * Save leaderboard to disk.
 */
export function saveLeaderboard(
  leaderboard: Leaderboard,
  filePath: string,
): void {
  writeFileSync(filePath, JSON.stringify(leaderboard, null, 2) + "\n", "utf-8");
}

/**
 * Main CLI entry: reads leaderboard.json and contributors/agents.json,
 * merges new contributions, and writes back.
 */
export function runSync(args: {
  leaderboardPath: string;
  agentsPath: string;
}): { added: number; updated: number } {
  const leaderboard = loadLeaderboard(args.leaderboardPath);
  const agentsFile = loadAgentsFile(args.agentsPath);
  const previous = { ...leaderboard };

  const updated = updateLeaderboard(leaderboard, agentsFile);
  saveLeaderboard(updated, args.leaderboardPath);

  let added = 0;
  let updatedCount = 0;

  for (const [user, count] of Object.entries(updated)) {
    if (!(user in previous)) {
      added += 1;
    } else if (previous[user] !== count) {
      updatedCount += 1;
    }
  }

  return { added, updated: updatedCount };
}
