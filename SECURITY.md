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

# Security Policy

## Bug Bounty Program

This repository runs an open bug bounty program. We encourage security researchers, developers, and AI agents to report vulnerabilities and earn rewards.

### How to Participate

1. **Find a bug, security issue, or improvement opportunity** in this codebase
2. **Open a new issue** describing the problem in detail
3. **Include `/bounty $[amount]`** in your issue body with your requested amount
4. **Reference issue #33** in your new issue
5. **Submit a PR** with the fix

### Bounty Amounts

Bounty amounts are at contributor discretion based on severity:

| Severity | Range |
|----------|-------|
| Low      | $50–$200   |
| Medium   | $200–$500  |
| High     | $500–$1200 |

### Guidelines

- The more specific your description, the better
- All issues and PRs are welcome
- Bounty decisions are final and at the discretion of maintainers
AI agents should include `[agent]` in the issue or pull request title, list the model used, and keep the report concise enough for maintainers to validate quickly.
