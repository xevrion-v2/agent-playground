#!/usr/bin/env bash
# Unit tests for the leaderboard update logic
# Tests the same jq operations used in .github/workflows/auto-process.yml

set -euo pipefail

PASS=0
FAIL=0

green() { echo -e "\033[32m✓\033[0m $*"; }
red()   { echo -e "\033[31m✗\033[0m $*"; ((FAIL++)) || true; }

assert_eq() {
  local got="$1" expected="$2" msg="$3"
  if [ "$got" = "$expected" ]; then
    green "$msg"
    ((PASS++)) || true
  else
    red "$msg — expected '$expected', got '$got'"
  fi
}

cleanup() {
  rm -rf "$TMPDIR"
}
trap cleanup EXIT

TMPDIR=$(mktemp -d)
cd "$TMPDIR"

# ── Test 1: Initialize empty leaderboard ──
echo "{}" > leaderboard.json
count=$(jq '. // {} | length' leaderboard.json)
assert_eq "$count" "0" "Empty leaderboard initializes with 0 entries"

# ── Test 2: Add new contributor ──
jq --arg user "newuser" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json
count=$(jq --arg user "newuser" '.[$user]' leaderboard.json)
assert_eq "$count" "1" "New contributor gets count 1"

# ── Test 3: Increment existing contributor ──
jq --arg user "newuser" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json
count=$(jq --arg user "newuser" '.[$user]' leaderboard.json)
assert_eq "$count" "2" "Existing contributor increments to 2"

# ── Test 4: Multiple contributors ──
jq --arg user "user2" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json
jq --arg user "user2" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json

u1=$(jq -r '.["newuser"]' leaderboard.json)
u2=$(jq -r '.["user2"]' leaderboard.json)
assert_eq "$u1" "2" "Multiple: newuser stays at 2"
assert_eq "$u2" "2" "Multiple: user2 reaches 2"

# ── Test 5: Missing file creates empty JSON ──
rm -f leaderboard.json
if [ ! -f leaderboard.json ]; then
  printf '{}\n' > leaderboard.json
fi
assert_eq "$(cat leaderboard.json)" "{}" "Missing file creates empty JSON"

# ── Test 6: Special characters in username ──
jq --arg user "user-with-dashes_123" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json
count=$(jq --arg user "user-with-dashes_123" '.[$user]' leaderboard.json)
assert_eq "$count" "1" "Username with dashes and underscores works"

# ── Test 7: Idempotent — same user counted once per run ──
# (The workflow deduplicates by commit message, we test the jq logic is deterministic)
before=$(jq --arg user "once" '.[$user] // 0' leaderboard.json)
jq --arg user "once" '.[$user] = ((.[$user] // 0) + 1)' leaderboard.json > tmp.json
mv tmp.json leaderboard.json
after=$(jq --arg user "once" '.[$user]' leaderboard.json)
assert_eq "$after" "1" "Deterministic increment from 0 to 1"

echo ""
echo "──────────────────────────────"
echo "Results: $PASS passed, $FAIL failed"
echo "──────────────────────────────"
[ "$FAIL" -eq 0 ] || exit 1
