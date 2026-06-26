import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const template = readFileSync(".github/ISSUE_TEMPLATE/pi_challenge.md", "utf8");
const bountyMatches = template.match(/\$50/g) ?? [];

assert.equal(
  bountyMatches.length,
  1,
  "PI challenge template should declare the default $50 bounty amount only once."
);

assert.match(
  template,
  /^\/bounty \$50$/m,
  "PI challenge template should keep the machine-readable /bounty $50 marker."
);
