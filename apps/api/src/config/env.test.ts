import assert from "node:assert/strict";
import test from "node:test";

import { getApiPort, getOptionalEnv, getRequiredEnv } from "./env";

test("getOptionalEnv returns trimmed values", () => {
  assert.equal(getOptionalEnv("API_URL", undefined, { API_URL: "  http://api.test  " }), "http://api.test");
});

test("getOptionalEnv falls back for missing or blank values", () => {
  assert.equal(getOptionalEnv("API_URL", "http://localhost", {}), "http://localhost");
  assert.equal(getOptionalEnv("API_URL", "http://localhost", { API_URL: "   " }), "http://localhost");
});

test("getRequiredEnv returns values and throws for missing settings", () => {
  assert.equal(getRequiredEnv("JWT_SECRET", { JWT_SECRET: " secret " }), "secret");
  assert.throws(
    () => getRequiredEnv("JWT_SECRET", {}),
    /Missing required environment variable: JWT_SECRET/,
  );
});

test("getApiPort parses the optional PORT setting", () => {
  assert.equal(getApiPort({}), 4000);
  assert.equal(getApiPort({ PORT: "5000" }), 5000);
  assert.throws(() => getApiPort({ PORT: "0" }), /PORT must be a positive integer/);
  assert.throws(() => getApiPort({ PORT: "abc" }), /PORT must be a positive integer/);
});
