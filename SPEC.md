# SPEC

## [xevrion-v2/agent-playground] Seeded starter bounty issues omit parent bounty reference

Task id: `github:xevrion-v2/agent-playground#1035`

## Goal
Parent bounty: #33

## Bug

`.github/workflows/seed-meta-issue.yml` tells contributors to reference the canonical Bug Bounty Program issue in new bounty issues, but `.github/workflows/seed-issues.yml` creates starter bounty issues without any parent/canonical bounty reference.

That makes seeded issues less traceable than manually created bounty issues and breaks the workflow guidance that new bounty issues should point back to the program instructions.

## Expected

- Before creating starter issues, the workflow should find the existing non-PR issue titled `Bug Bounty Program — How to Participate`.
- Each seeded starter issue body should include a parent bounty reference such as `Parent bounty: #33` when that canonical issue is found.
- Keep the existing `/bounty $50` marker and seeded issue acceptance criteria unchanged.

## Scope

Keep the fix focused on `.github/workflows/seed-issues.yml` plus required AI agent metadata.

/bounty $50

## Acceptance criteria
- Before creating starter issues, the workflow should find the existing non-PR issue titled `Bug Bounty Program — How to Participate`.
- Each seeded starter issue body should include a parent bounty reference such as `Parent bounty: #33` when that canonical issue is found.
- Keep the existing `/bounty $50` marker and seeded issue acceptance criteria unchanged.

## Stack hints
(any)



Produce ALL files as a single JSON response. No markdown fences, no prose — just the JSON object.
