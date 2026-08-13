#!/usr/bin/env bash
set -euo pipefail

# Unit tests for leaderboard.json update logic
# Tests the core jq-based increment logic used in the auto-process workflow.

PASS=0
FAIL=0
tmp_dir=$(mktemp -d)
trap 'rm -rf "$tmp_dir"' EXIT

assert_eq() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  PASS: $desc"
    ((PASS++))
  else
    echo "  FAIL: $desc"
    echo "    expected: $expected"
    echo "    actual:   $actual"
    ((FAIL++))
  fi
}

# Test 1: New contributor gets count 1
echo "Test 1: New contributor"
printf '{}\n' > "$tmp_dir/leaderboard.json"
tmp_file="$(mktemp)"
jq --arg user "new_user" '.[$user] = ((.[$user] // 0) + 1)' "$tmp_dir/leaderboard.json" > "$tmp_file"
mv "$tmp_file" "$tmp_dir/leaderboard.json"
result=$(jq -r '.new_user' "$tmp_dir/leaderboard.json")
assert_eq "New contributor starts at 1" "1" "$result"

# Test 2: Existing contributor gets incremented
echo "Test 2: Existing contributor"
printf '{"existing_user": 5}\n' > "$tmp_dir/leaderboard.json"
tmp_file="$(mktemp)"
jq --arg user "existing_user" '.[$user] = ((.[$user] // 0) + 1)' "$tmp_dir/leaderboard.json" > "$tmp_file"
mv "$tmp_file" "$tmp_dir/leaderboard.json"
result=$(jq -r '.existing_user' "$tmp_dir/leaderboard.json")
assert_eq "Existing contributor increments from 5 to 6" "6" "$result"

# Test 3: Multiple contributors unaffected
echo "Test 3: Multiple contributors isolated"
printf '{"alice": 1, "bob": 3}\n' > "$tmp_dir/leaderboard.json"
tmp_file="$(mktemp)"
jq --arg user "bob" '.[$user] = ((.[$user] // 0) + 1)' "$tmp_dir/leaderboard.json" > "$tmp_file"
mv "$tmp_file" "$tmp_dir/leaderboard.json"
alice=$(jq -r '.alice' "$tmp_dir/leaderboard.json")
bob=$(jq -r '.bob' "$tmp_dir/leaderboard.json")
assert_eq "Alice stays at 1" "1" "$alice"
assert_eq "Bob increments to 4" "4" "$bob"

# Test 4: Empty value handling
echo "Test 4: Edge case - null user"
printf '{"null_user": null}\n' > "$tmp_dir/leaderboard.json"
tmp_file="$(mktemp)"
jq --arg user "null_user" '.[$user] = ((.[$user] // 0) + 1)' "$tmp_dir/leaderboard.json" > "$tmp_file"
mv "$tmp_file" "$tmp_dir/leaderboard.json"
result=$(jq -r '.null_user' "$tmp_dir/leaderboard.json")
assert_eq "Null user treated as 0 then incremented to 1" "1" "$result"

echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
