#!/usr/bin/env bash
# Smoke test for the malformed-JSON body handler (issue #1248).
# Spins up the API, hits POST /users with a malformed JSON body, and asserts
# the response is HTTP 400 with the spec's JSON error shape.
#
# Usage:  bash scripts/smoke-json-parse.sh
# Exits 0 on success, non-zero on any assertion failure.

set -euo pipefail

PORT="${PORT:-4321}"
BASE="http://127.0.0.1:${PORT}"
LOG_DIR="$(mktemp -d)"
LOG_FILE="${LOG_DIR}/api.log"

cleanup() {
  if [[ -n "${API_PID:-}" ]] && kill -0 "${API_PID}" 2>/dev/null; then
    kill "${API_PID}" 2>/dev/null || true
    wait "${API_PID}" 2>/dev/null || true
  fi
  rm -rf "${LOG_DIR}"
}
trap cleanup EXIT

echo "[smoke] starting API on port ${PORT}..."
PORT="${PORT}" npx --prefix apps/api tsx apps/api/src/index.ts >"${LOG_FILE}" 2>&1 &
API_PID=$!

# Wait for the server to be ready (max ~10s).
for _ in $(seq 1 50); do
  if curl -fsS "${BASE}/health" >/dev/null 2>&1; then
    break
  fi
  sleep 0.2
done

if ! curl -fsS "${BASE}/health" >/dev/null 2>&1; then
  echo "[smoke] API failed to start. Log tail:" >&2
  tail -n 50 "${LOG_FILE}" >&2 || true
  exit 1
fi

echo "[smoke] API up. Running assertions..."

# 1. Valid /health still returns 200 JSON (regression guard).
HEALTH_BODY="$(curl -fsS "${BASE}/health")"
echo "${HEALTH_BODY}" | grep -q '"status":"ok"' \
  || { echo "[smoke] FAIL: /health body regressed: ${HEALTH_BODY}"; exit 1; }

# 2. Malformed JSON body returns 400 + the spec's error shape, not HTML.
TMP_HEADERS="$(mktemp)"
TMP_BODY="$(mktemp)"
HTTP_STATUS="$(curl -sS -o "${TMP_BODY}" -D "${TMP_HEADERS}" -w "%{http_code}" \
  -X POST "${BASE}/users" \
  -H "Content-Type: application/json" \
  --data-binary '{ this is not json')"

CONTENT_TYPE="$(grep -i '^content-type:' "${TMP_HEADERS}" | tr -d '\r' | head -n1 | awk '{print tolower($2)}')"
BODY="$(cat "${TMP_BODY}")"

echo "[smoke] malformed POST /users -> ${HTTP_STATUS} (${CONTENT_TYPE})"
echo "[smoke] body: ${BODY}"

[[ "${HTTP_STATUS}" == "400" ]] \
  || { echo "[smoke] FAIL: expected 400, got ${HTTP_STATUS}"; exit 1; }

[[ "${CONTENT_TYPE}" == application/json* ]] \
  || { echo "[smoke] FAIL: expected JSON content-type, got '${CONTENT_TYPE}'"; exit 1; }

# Body must match the spec's shape; do not require exact key order.
echo "${BODY}" | grep -q '"error"' \
  || { echo "[smoke] FAIL: response missing 'error' key: ${BODY}"; exit 1; }

echo "${BODY}" | grep -q '"Invalid JSON request body"' \
  || { echo "[smoke] FAIL: response missing spec error string: ${BODY}"; exit 1; }

# Body must NOT be HTML.
echo "${BODY}" | grep -qiE '<html|<body|<!doctype' \
  && { echo "[smoke] FAIL: response looks like HTML: ${BODY}"; exit 1; }

# 3. Valid JSON still works on /users (regression guard for happy path).
VALID_STATUS="$(curl -sS -o /dev/null -w "%{http_code}" \
  -X POST "${BASE}/users" \
  -H "Content-Type: application/json" \
  --data '{"name":"larry"}')"
[[ "${VALID_STATUS}" == "201" ]] \
  || { echo "[smoke] FAIL: valid JSON POST /users expected 201, got ${VALID_STATUS}"; exit 1; }

rm -f "${TMP_HEADERS}" "${TMP_BODY}"

echo "[smoke] OK — malformed JSON returns JSON 400 with the spec error string."
