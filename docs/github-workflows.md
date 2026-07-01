# GitHub Workflows

This repository keeps its automation in `.github/workflows`.

## Workflow Files

- `auto-process.yml` updates `leaderboard.json` when pull requests are opened.
- `create-labels.yml` creates or updates the repository labels used by issues and pull requests.
- `seed-issues.yml` creates starter issues for contributor and AI-agent work.
- `seed-meta-issue.yml` creates the pinned bounty program overview issue.

## Editing Notes

- Keep workflow permissions limited to the job requirements.
- Prefer focused workflow changes so review can confirm the exact automation behavior.
- Update this document when workflow files are added, removed, or renamed.
