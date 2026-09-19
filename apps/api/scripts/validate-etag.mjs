import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../src/index.ts", import.meta.url), "utf8");
const disableIndex = source.indexOf('app.disable("etag")');
const jsonIndex = source.indexOf("app.use(express.json())");
const healthIndex = source.indexOf('app.get("/health"');

if (disableIndex < 0) throw new Error("Expected Express ETag generation to be disabled");
if (disableIndex > jsonIndex || disableIndex > healthIndex) {
  throw new Error("ETag must be disabled before middleware and routes are registered");
}

console.log("ETag validation passed");
