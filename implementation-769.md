# Implementation for #769

See issue #769 for details.

/bounty $50

References #33.

## Problem

The small task issue template uses a hyphenated label name:

```yaml
labels: good-first-issue
```

But the repository's label configuration defines the intended label as `good first issue` with spaces, and the seeded issue workflow also applies `good first issue`.

That mismatch means issues created from `.github/ISSUE_TEMPLATE/task.md` can miss the expected first-contributor discovery label or try to apply a non-standard duplicate label name.

## Expect