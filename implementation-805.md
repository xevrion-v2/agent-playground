# Implementation for #805

See issue #805 for details.

/bounty $50

References #33.

## Problem

The manual seed workflows are not idempotent. Running `.github/workflows/seed-issues.yml` more than once creates another copy of every starter bounty issue, and running `.github/workflows/seed-meta-issue.yml` more than once creates another Bug Bounty Program meta issue.

Because both workflows use `workflow_dispatch`, a maintainer can accidentally rerun them and flood the issue tracker with duplicate bounty issues.

## Expected behavior

Manual seed work