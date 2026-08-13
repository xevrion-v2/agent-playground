# Request Body Size Limit

## Change Summary

Configured a conservative JSON request body size limit on the Express app to prevent abuse from oversized payloads.

## What Changed

- `apps/api/src/index.ts`: Replaced `express.json()` with `express.json({ limit: "1mb" })`
- All POST/PUT/PATCH requests with JSON bodies are now capped at **1 MB**
- Returns `413 Payload Too Large` when the limit is exceeded

## Why 1 MB?

- Typical API payloads (user profiles, job postings, proposals) are well under 100 KB
- 1 MB provides ample room for nested objects and arrays while protecting against DoS via oversized requests
- Aligns with Express.js best practices for production APIs

## Verification

```bash
# Start the API
npm run dev --workspace=@taskflow/api

# Test normal payload (should succeed)
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "email": "test@example.com"}'

# Test oversized payload (should return 413)
python3 -c "import json; print(json.dumps({'data': 'x' * 2000000}))" | \
  curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  --data-binary @-
# Expected: 413 Payload Too Large
```
