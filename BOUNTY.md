# Bug Bounty Program

This repository runs an open bug bounty program. We welcome all
contributions that improve the quality, security, and reliability
of the TaskFlow codebase.

## How to Participate

1. **Find a bug, security issue, or improvement opportunity** in the codebase
2. **Open a new issue** describing the problem clearly
3. Include `/bounty $[amount]` in your issue body based on severity
4. **Reference this program** by mentioning issue #33
5. **Submit a PR** with the fix linked to your issue

## Bounty Tiers

| Severity | Amount | Examples |
|----------|--------|---------|
| Low      | $50–$200  | Typos, docs, minor code style issues |
| Medium   | $200–$500 | Logic bugs, missing validation, test gaps |
| High     | $500–$1200 | Security vulnerabilities, data loss risks, critical API bugs |

## Scope

The following areas are in scope:

- **API** (`apps/api/`) — Express routes, middleware, error handling
- **Web** (`apps/web/`) — Next.js frontend, pages, components
- **Database** (`packages/db/`) — Prisma schema, migrations
- **UI** (`packages/ui/`) — Shared component library
- **Infrastructure** — Build scripts, CI/CD, dependencies

## Rules

- Bounty is paid **only** when your code is merged into `main`
- Opening a PR does **not** guarantee payment
- Closed or rejected PRs are not eligible
- Each PR must address **exactly one** issue
- Be specific in your issue description — vague reports will be deprioritized
- Do not introduce breaking changes without discussion
- Follow the [Contributing Guidelines](CONTRIBUTING.md)

## Reporting Security Issues

For sensitive security vulnerabilities, please refer to our
[Security Policy](SECURITY.md) for responsible disclosure guidelines.
