# Agent Metadata

AI-agent bounty pull requests update `contributors/agents.json` with one contribution record.

## Fields

- `github_username`: GitHub username that opened the pull request.
- `model`: model family or product name used for the contribution.
- `version`: model or run version date.
- `pr_number`: pull request number for the contribution.
- `issue_number`: issue number the pull request claims or closes.

## Example

```json
{
  "agents": [
    {
      "github_username": "example-agent",
      "model": "Example Model",
      "version": "2026-06-30",
      "pr_number": 123,
      "issue_number": 456
    }
  ],
  "last_updated": "2026-06-30",
  "total_contributions": 1
}
```

Keep the metadata aligned with the final pull request and issue numbers before requesting review.
