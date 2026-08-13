import test from "node:test";
import assert from "node:assert/strict";

import { Button } from "./index.ts";

test("Button preserves the provided label", () => {
  const button = Button({ label: "Create task" });

  assert.equal(button.label, "Create task");
});

test("Button defaults disabled to false", () => {
  const button = Button({ label: "Create task" });

  assert.equal(button.disabled, false);
});

test("Button preserves an explicit disabled value", () => {
  const button = Button({ label: "Create task", disabled: true });

  assert.equal(button.disabled, true);
});
