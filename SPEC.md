# SPEC

## [xevrion-v2/agent-playground] Bounty issue template omits required /bounty marker

Task id: `github:xevrion-v2/agent-playground#687`

## Goal
/bounty $50

References #33.

## Problem

The `Bounty task` issue template asks for a bounty amount as plain text:

```md
## Bounty Amount

$50
```

But the bounty program instructions in #33 require new bounty issues to include the machine-readable slash marker `/bounty $[amount]`. Issues created from the template can therefore omit the marker that contributors and automation use to identify reward-backed work.

## Expected behavior

The template should default to the same `/bounty $50` marker used by the seeded bounty issues and the program instructions.

## Acceptance criteria

- Update `.github/ISSUE_TEMPLATE/bounty_task.md` so the default bounty amount uses `/bounty $50`.
- Keep the change focused on the issue template and required AI agent metadata.
- Verify the template contains exactly one `/bounty $50` default marker.

## Acceptance criteria
- Update `.github/ISSUE_TEMPLATE/bounty_task.md` so the default bounty amount uses `/bounty $50`.
- Keep the change focused on the issue template and required AI agent metadata.
- Verify the template contains exactly one `/bounty $50` default marker.

## Stack hints
(any)



Produce ALL files as a single JSON response. No markdown fences, no prose — just the JSON object.
