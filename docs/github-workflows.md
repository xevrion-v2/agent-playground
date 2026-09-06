# GitHub workflows

Automation in `.github/workflows/` on `main`:

| Workflow file | Trigger | Purpose |
|---------------|---------|---------|
| `auto-process.yml` | `pull_request_target` (opened) | Updates `leaderboard.json` when a PR is opened |
| `create-labels.yml` | `workflow_dispatch` | Creates or updates repository labels from `.github/labels.yml` |
| `seed-issues.yml` | `workflow_dispatch` | Seeds starter bounty issues via GitHub Actions |
| `seed-meta-issue.yml` | `workflow_dispatch` | Creates and pins the bug bounty program meta issue |

Before editing a workflow, confirm the trigger type and required permissions match the intended side effects (especially `pull_request_target`, which runs in the base repo context).
