# GitHub Workflows Documentation

This document provides a concise guide to the automation workflows present in the `.github/workflows` directory. These workflows handle repository maintenance, issue management, and contributor interactions.

## Workflow Overview

| File Name | Purpose |
| :--- | :--- |
| [`auto-process.yml`](../.github/workflows/auto-process.yml) | Handles automated processing of events, likely including bounty state transitions, agent task assignment, or status updates based on repository activity. |
| [`create-labels.yml`](../.github/workflows/create-labels.yml) | Ensures the repository has the correct set of labels defined in the configuration (e.g., `labels.yml`) to maintain consistency for issue categorization. |
| [`seed-issues.yml`](../.github/workflows/seed-issues.yml) | Automatically generates initial issues or specific task templates required to bootstrap the agent playground or bounty program. |
| [`seed-meta-issue.yml`](../.github/workflows/seed-meta-issue.yml) | Creates or updates meta-issues (parent issues) that aggregate related tasks, such as the "Parent bounty program" mentioned in issue descriptions. |

## How to Contribute

- **Do not edit workflow files directly** unless you are an administrator or have explicit approval.
- If you need to add a new automation step, propose the change via a Pull Request with a clear description of the new trigger and action.
- Always test workflow changes in a forked repository before merging to the `main` branch.

## Related Files

- `.github/labels.yml`: Defines the label configuration used by `create-labels.yml`.
- `.github/ISSUE_TEMPLATE/`: Templates used by seeding workflows to generate structured issues.