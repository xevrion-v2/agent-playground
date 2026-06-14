#!/usr/bin/env python3
"""Leaderboard update script for agent-playground.

Reads leaderboard.json, updates contributor scores, and writes back.
Supports adding new contributors and incrementing existing ones.
"""

import json
import os
from typing import Dict

LEADERBOARD_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "leaderboard.json"
)


def load_leaderboard(path: str = LEADERBOARD_PATH) -> Dict[str, int]:
    """Load the leaderboard from disk."""
    with open(path, "r") as f:
        return json.load(f)


def save_leaderboard(data: Dict[str, int], path: str = LEADERBOARD_PATH) -> None:
    """Save the leaderboard to disk."""
    with open(path, "w") as f:
        json.dump(data, f, indent=2, sort_keys=True)
        f.write("\n")


def add_contribution(leaderboard: Dict[str, int], contributor: str, count: int = 1) -> Dict[str, int]:
    """Add contributions for a contributor. Creates entry if new."""
    if count < 0:
        raise ValueError("Contribution count must be non-negative")
    if not contributor:
        raise ValueError("Contributor name must not be empty")
    leaderboard[contributor] = leaderboard.get(contributor, 0) + count
    return leaderboard


def remove_contributor(leaderboard: Dict[str, int], contributor: str) -> bool:
    """Remove a contributor from the leaderboard. Returns True if removed."""
    if contributor in leaderboard:
        del leaderboard[contributor]
        return True
    return False


def update_leaderboard(contributor: str, count: int = 1, path: str = LEADERBOARD_PATH) -> Dict[str, int]:
    """Load, update, and save the leaderboard in one step."""
    leaderboard = load_leaderboard(path)
    add_contribution(leaderboard, contributor, count)
    save_leaderboard(leaderboard, path)
    return leaderboard


if __name__ == "__main__":
    import sys
    if len(sys.argv) < 2:
        print("Usage: update_leaderboard.py <contributor> [count]")
        sys.exit(1)
    name = sys.argv[1]
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 1
    result = update_leaderboard(name, count)
    print(f"Updated {name}: now has {result[name]} contributions")
