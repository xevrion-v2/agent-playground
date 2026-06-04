import { test } from "node:test";
import assert from "node:assert";
import { Button } from "./index.js";

test("Button component returns correct representation with label", () => {
  const result = Button({ label: "Submit" });
  assert.strictEqual(result.type, "button");
  assert.strictEqual(result.label, "Submit");
  assert.strictEqual(result.disabled, false);
});

test("Button component respects disabled prop when true", () => {
  const result = Button({ label: "Submit", disabled: true });
  assert.strictEqual(result.type, "button");
  assert.strictEqual(result.label, "Submit");
  assert.strictEqual(result.disabled, true);
});

test("Button component respects disabled prop when false", () => {
  const result = Button({ label: "Submit", disabled: false });
  assert.strictEqual(result.type, "button");
  assert.strictEqual(result.label, "Submit");
  assert.strictEqual(result.disabled, false);
});
