#!/usr/bin/env bash
# Increment the PR count for a user in leaderboard.json.
#
# Usage: ./scripts/update-leaderboard.sh <username> [leaderboard.json]
#
# If leaderboard.json does not exist it is created with an empty object.

set -euo pipefail

USER="${1:?Usage: update-leaderboard.sh <username> [file]}"
FILE="${2:-leaderboard.json}"

if [ ! -f "$FILE" ]; then
  printf '{}\n' > "$FILE"
fi

tmp_file="$(mktemp)"
jq --arg user "$USER" '.[$user] = ((.[$user] // 0) + 1)' "$FILE" > "$tmp_file"
mv "$tmp_file" "$FILE"
