#!/usr/bin/env bash
# Tests for scripts/update-leaderboard.sh
#
# Run: bash scripts/test-leaderboard.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
UPDATE="$SCRIPT_DIR/update-leaderboard.sh"
PASS=0
FAIL=0
TMPDIR="$(mktemp -d)"

cleanup() { rm -rf "$TMPDIR"; }
trap cleanup EXIT

assert_eq() {
  local desc="$1" expected="$2" actual="$3"
  if [ "$expected" = "$actual" ]; then
    echo "  ✓ $desc"
    PASS=$((PASS + 1))
  else
    echo "  ✗ $desc"
    echo "    expected: $expected"
    echo "    actual:   $actual"
    FAIL=$((FAIL + 1))
  fi
}

# ── Test 1: new user in empty file ──────────────────────────────────
echo "Test 1: new user in empty file"
FILE="$TMPDIR/t1.json"
bash "$UPDATE" alice "$FILE"
result="$(jq -r '.alice' "$FILE")"
assert_eq "alice count is 1" "1" "$result"

# ── Test 2: same user incremented twice ─────────────────────────────
echo "Test 2: same user incremented twice"
FILE="$TMPDIR/t2.json"
bash "$UPDATE" bob "$FILE"
bash "$UPDATE" bob "$FILE"
result="$(jq -r '.bob' "$FILE")"
assert_eq "bob count is 2" "2" "$result"

# ── Test 3: multiple users ─────────────────────────────────────────
echo "Test 3: multiple users"
FILE="$TMPDIR/t3.json"
bash "$UPDATE" alice "$FILE"
bash "$UPDATE" bob "$FILE"
bash "$UPDATE" alice "$FILE"
alice="$(jq -r '.alice' "$FILE")"
bob="$(jq -r '.bob' "$FILE")"
assert_eq "alice count is 2" "2" "$alice"
assert_eq "bob count is 1" "1" "$bob"

# ── Test 4: pre-populated file ──────────────────────────────────────
echo "Test 4: pre-populated file"
FILE="$TMPDIR/t4.json"
printf '{"existing_user":5}\n' > "$FILE"
bash "$UPDATE" existing_user "$FILE"
bash "$UPDATE" new_user "$FILE"
existing="$(jq -r '.existing_user' "$FILE")"
new_u="$(jq -r '.new_user' "$FILE")"
assert_eq "existing_user count is 6" "6" "$existing"
assert_eq "new_user count is 1" "1" "$new_u"

# ── Test 5: default file path uses leaderboard.json ─────────────────
echo "Test 5: default file path"
cd "$TMPDIR"
bash "$UPDATE" defaultuser
result="$(jq -r '.defaultuser' "$TMPDIR/leaderboard.json")"
assert_eq "defaultuser count in leaderboard.json is 1" "1" "$result"

# ── Test 6: preserves other keys ────────────────────────────────────
echo "Test 6: preserves other keys"
FILE="$TMPDIR/t6.json"
printf '{"alpha":3,"beta":7}\n' > "$FILE"
bash "$UPDATE" gamma "$FILE"
alpha="$(jq -r '.alpha' "$FILE")"
beta="$(jq -r '.beta' "$FILE")"
gamma="$(jq -r '.gamma' "$FILE")"
assert_eq "alpha preserved at 3" "3" "$alpha"
assert_eq "beta preserved at 7" "7" "$beta"
assert_eq "gamma added as 1" "1" "$gamma"

# ── Summary ─────────────────────────────────────────────────────────
echo ""
echo "Results: $PASS passed, $FAIL failed"
[ "$FAIL" -eq 0 ] && exit 0 || exit 1
