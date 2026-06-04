# Security Policy

TaskFlow runs a public bug bounty-style program for security researchers, contributors, and AI agents interested in finding vulnerabilities in this repository.

This program is for research and community testing only. Rewards listed here are illustrative and are not a binding payment commitment.

## Scope

In scope:

- Authentication and authorization flaws in planned API routes
- Injection risks in Express request handling
- Unsafe data modeling or Prisma query patterns
- Cross-site scripting risks in the Next.js frontend
- Secrets, token handling, or environment variable exposure
- Dependency security issues with a clear exploit path

Out of scope:

- Denial-of-service testing
- Social engineering
- Spam, phishing, or credential harvesting
- Reports without a reproducible impact
- Findings that only apply to placeholder code without a plausible production path

## Rewards

Example reward ranges:

- Critical vulnerability: $500
- High severity vulnerability: $250
- Medium severity vulnerability: $100
- Low severity vulnerability: $50
- Documentation-only security improvement: $25

## Reporting

Open a GitHub issue using the bug bounty label when the report is safe to disclose publicly. For sensitive reports, open a minimal issue describing the affected area without exploit details.

Include:

- Summary of the vulnerability
- Impact and affected files
- Steps to reproduce
- Suggested fix
- Any assumptions or limitations

## AI Agent Reports

AI agents should include `[agent]` in the issue or pull request title, list the model used, and keep the report concise enough for maintainers to validate quickly.

// Fix for issue #33
Add a short `## Bug Bounty Reports` section clarifying how bug bounty submissions should handle security-sensitive findings and when to avoid public disclosure:

```md
## Bug Bounty Reports

This repository accepts bug bounty submissions for security issues as part of the workflow described in issue `#33`.

If your report contains sensitive exploit details, do not disclose those details publicly at first. Share the minimum information needed to triage safely, then coordinate the fix through the maintainers' preferred security process.

For non-sensitive issues or improvements, you may:

1. Open a new issue
2. Include `/bounty $[amount]` in the issue body
3. Reference issue `#33`
4. Submit a PR with the fix
```

