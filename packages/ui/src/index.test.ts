import test from "node:test";
import assert from "node:assert";
import { Button } from "./index";

test("Button component stub", async (t) => {
  await t.test("should return button type and correct label", () => {
    const result = Button({ label: "Click me" });
    assert.strictEqual(result.type, "button");
    assert.strictEqual(result.label, "Click me");
    assert.strictEqual(result.disabled, false);
  });

  await t.test("should respect disabled prop when true", () => {
    const result = Button({ label: "Submit", disabled: true });
    assert.strictEqual(result.label, "Submit");
    assert.strictEqual(result.disabled, true);
  });

  await t.test("should respect disabled prop when false", () => {
    const result = Button({ label: "Cancel", disabled: false });
    assert.strictEqual(result.label, "Cancel");
    assert.strictEqual(result.disabled, false);
  });
});
