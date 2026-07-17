import { test } from "node:test";
import assert from "node:assert/strict";
import { Button } from "./index.ts";

test("Button renders the provided label with type 'button'", () => {
  const b = Button({ label: "Save" });
  assert.equal(b.type, "button");
  assert.equal(b.label, "Save");
});

test("Button defaults disabled to false and honors an explicit value", () => {
  assert.equal(Button({ label: "A" }).disabled, false);
  assert.equal(Button({ label: "B", disabled: true }).disabled, true);
});
