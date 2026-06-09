import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const entrypoint = readFileSync(new URL("./index.ts", import.meta.url), "utf8");
const packageJson = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8")
) as {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

test("API mounts CORS middleware before body parsing and routes", () => {
  const corsImportIndex = entrypoint.indexOf('import cors from "cors";');
  const corsUseIndex = entrypoint.indexOf("app.use(cors());");
  const jsonUseIndex = entrypoint.indexOf("app.use(express.json());");
  const healthRouteIndex = entrypoint.indexOf('app.get("/health"');
  const usersRouteIndex = entrypoint.indexOf('app.use("/users"');

  assert.notEqual(corsImportIndex, -1);
  assert.notEqual(corsUseIndex, -1);
  assert.ok(corsUseIndex < jsonUseIndex);
  assert.ok(corsUseIndex < healthRouteIndex);
  assert.ok(corsUseIndex < usersRouteIndex);
});

test("API declares CORS runtime and TypeScript dependencies", () => {
  assert.equal(packageJson.dependencies?.cors, "^2.8.5");
  assert.equal(packageJson.devDependencies?.["@types/cors"], "^2.8.17");
});
