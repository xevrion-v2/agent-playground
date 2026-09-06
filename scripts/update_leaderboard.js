#!/usr/bin/env node
/** Increment contributor PR count in leaderboard.json */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

export function updateLeaderboard(data, username) {
  if (typeof username !== "string" || !username.trim()) {
    throw new Error("username required");
  }
  const key = username.trim();
  const next = { ...data, [key]: (data[key] ?? 0) + 1 };
  return next;
}

export function loadLeaderboard(path) {
  const raw = readFileSync(path, "utf8");
  return JSON.parse(raw);
}

export function saveLeaderboard(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf8");
}

if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const user = process.argv[2];
  const file = resolve(process.cwd(), "leaderboard.json");
  const data = loadLeaderboard(file);
  saveLeaderboard(file, updateLeaderboard(data, user));
  console.log(`updated ${user}`);
}
