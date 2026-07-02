import assert from "node:assert/strict";
import test from "node:test";

import { Button } from "./index.ts";

test("Button returns label and disabled flag", () => {
  const result = Button({ label: "Save", disabled: true });
  assert.equal(result.type, "button");
  assert.equal(result.label, "Save");
  assert.equal(result.disabled, true);
});

test("Button defaults disabled to false", () => {
  const result = Button({ label: "Go" });
  assert.equal(result.disabled, false);
});
