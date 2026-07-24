#!/usr/bin/env node
/** Update leaderboard.json when a contributor earns another merged PR. */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export type Leaderboard = Record<string, number>;

export function loadLeaderboard(path: string): Leaderboard {
  return JSON.parse(readFileSync(path, "utf-8")) as Leaderboard;
}

export function incrementContributor(board: Leaderboard, username: string): Leaderboard {
  const next = { ...board };
  next[username] = (next[username] ?? 0) + 1;
  return next;
}

export function saveLeaderboard(path: string, board: Leaderboard): void {
  writeFileSync(path, `${JSON.stringify(board, null, 2)}\n`, "utf-8");
}

if (import.meta.url === `file://${resolve(process.argv[1] ?? "")}`) {
  const file = process.argv[2] ?? "leaderboard.json";
  const user = process.argv[3];
  if (!user) {
    throw new Error("Usage: node scripts/update-leaderboard.mjs <file> <username>");
  }
  const board = loadLeaderboard(file);
  saveLeaderboard(file, incrementContributor(board, user));
}
