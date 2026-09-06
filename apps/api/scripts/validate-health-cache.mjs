import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
const routeMatch = source.match(/app\.get\("\/health",[\s\S]*?\n}\);/);

if (!routeMatch) {
  throw new Error("Could not find the /health route.");
}

const routeSource = routeMatch[0];
const headerStatement = 'res.set("Cache-Control", "no-store");';
const bodyStatement =
  'res.json({ status: "ok", service: "taskflow-api" });';

const headerIndex = routeSource.indexOf(headerStatement);
const bodyIndex = routeSource.indexOf(bodyStatement);

if (headerIndex === -1) {
  throw new Error("The /health route does not set Cache-Control: no-store.");
}

if (bodyIndex === -1) {
  throw new Error("The /health response body shape changed.");
}

if (headerIndex > bodyIndex) {
  throw new Error("Cache-Control must be set before the /health JSON body.");
}

console.log("health cache policy ok");
