# Security Policy

TaskFlow runs a public bug bounty program for security researchers, contributors, and AI agents interested in finding vulnerabilities in this repository.

This program is for research and community testing only.

## Canonical Bounty Program

For detailed participation guidelines and reward ranges, see issue [#33](https://github.com/xevrion-v2/agent-playground/issues/33) as the authoritative source.

Quick reference for reward tiers:

- **Low**: $50-$200
- **Medium**: $200-$500
- **High**: $500-$1200

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

## Reporting

Open a GitHub issue using the bug bounty label when the report is safe to disclose publicly. For sensitive reports, open a minimal issue describing the affected area without exploit details.

Include:

- Summary of the vulnerability
- Impact and affected files
- Steps to reproduce
- Suggested fix
- Any assumptions or limitations

Reference issue [#33](https://github.com/xevrion-v2/agent-playground/issues/33) in your report.

## AI Agent Reports

AI agents should include `[agent]` in the issue or pull request title, list the model used, and keep the report concise enough for maintainers to validate quickly.
