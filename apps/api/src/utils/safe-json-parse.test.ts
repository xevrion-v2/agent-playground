import assert from "node:assert/strict";
import test from "node:test";

import { safeJsonParse } from "./safe-json-parse.ts";

test("parses valid JSON objects with the requested generic type", () => {
  const result = safeJsonParse<{ enabled: boolean; retries: number }>(
    "{\"enabled\":true,\"retries\":3}",
  );

  assert.deepEqual(result, { enabled: true, retries: 3 });
});

test("preserves valid JSON null instead of treating it as a parse failure", () => {
  const result = safeJsonParse<null>("null");

  assert.equal(result, null);
});

test("returns undefined for invalid JSON without throwing", () => {
  assert.doesNotThrow(() => safeJsonParse("{\"enabled\":"));
  assert.equal(safeJsonParse("{\"enabled\":"), undefined);
});
