import { readFileSync } from "node:fs";

const source = readFileSync("apps/api/src/routes/users.ts", "utf8");
const getIndex = source.search(/router\.get\(\s*["']\/["']/);
const postIndex = source.search(/router\.post\(\s*["']\/["']/);
const fallbackIndex = source.search(/router\.all\(\s*["']\/["']/);

const checks = [
  {
    name: "GET route remains before fallback",
    passed: getIndex >= 0 && fallbackIndex > getIndex
  },
  {
    name: "POST route remains before fallback",
    passed: postIndex >= 0 && fallbackIndex > postIndex
  },
  {
    name: "unsupported /users methods return 405",
    passed: source.includes("res.status(405)")
  },
  {
    name: "Allow header lists supported methods",
    passed: source.includes('res.set("Allow", "GET, POST")')
  },
  {
    name: "response identifies unsupported method",
    passed: source.includes("method: req.method")
  }
];

const failed = checks.filter((check) => !check.passed);

for (const check of checks) {
  console.log(`${check.passed ? "ok" : "not ok"} - ${check.name}`);
}

if (failed.length > 0) {
  process.exitCode = 1;
}
