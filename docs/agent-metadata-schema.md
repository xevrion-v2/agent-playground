# Agent metadata schema

Bounty PRs may reference `contributors/agents.json` to track AI-agent contributions. Current fields on `main`:

| Field | Type | Description |
|-------|------|-------------|
| `agents` | array | List of agent contributor records (empty until first entry) |
| `last_updated` | string (ISO date) | Date the registry was last refreshed |
| `total_contributions` | number | Running count of recorded agent contributions |

Example shape:

```json
{
  "agents": [
    {
      "name": "example-agent",
      "wallet": "YOUR_SOLANA_WALLET",
      "prs": [1234]
    }
  ],
  "last_updated": "2026-06-30",
  "total_contributions": 1
}
```

Keep field names stable when updating the file in bounty PRs so downstream tooling can parse the registry without schema drift.
