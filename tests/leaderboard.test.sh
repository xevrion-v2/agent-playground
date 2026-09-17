#!/bin/bash
set -euo pipefail

echo "Running leaderboard update script tests..."

# Helper function to run the jq command (simulating the workflow step)
run_update() {
  local pr_user="$1"
  local json_file="$2"
  local tmp_file="$(mktemp)"
  jq --arg user "${pr_user}" '.[$user] = ((.[$user] // 0) + 1)' "$json_file" > "${tmp_file}"
  mv "${tmp_file}" "$json_file"
}

# Test 1: New contributor
echo "Test 1: New contributor"
echo "{}" > test_leaderboard.json
run_update "alice" test_leaderboard.json
if ! grep -q '"alice": 1' test_leaderboard.json; then
  echo "FAIL: Expected alice to have 1 PR"
  cat test_leaderboard.json
  exit 1
fi
echo "PASS: New contributor added correctly."

# Test 2: Existing contributor
echo "Test 2: Existing contributor"
echo '{"bob": 5}' > test_leaderboard.json
run_update "bob" test_leaderboard.json
if ! grep -q '"bob": 6' test_leaderboard.json; then
  echo "FAIL: Expected bob to have 6 PRs"
  cat test_leaderboard.json
  exit 1
fi
echo "PASS: Existing contributor incremented correctly."

# Test 3: Multiple updates
echo "Test 3: Multiple updates and existing unaffected"
echo '{"alice": 1, "charlie": 2}' > test_leaderboard.json
run_update "alice" test_leaderboard.json
if ! grep -q '"alice": 2' test_leaderboard.json; then
  echo "FAIL: Expected alice to have 2 PRs"
  cat test_leaderboard.json
  exit 1
fi
if ! grep -q '"charlie": 2' test_leaderboard.json; then
  echo "FAIL: Expected charlie to have 2 PRs"
  cat test_leaderboard.json
  exit 1
fi
echo "PASS: Multiple updates processed correctly."

rm test_leaderboard.json
echo "All leaderboard unit tests passed!"
