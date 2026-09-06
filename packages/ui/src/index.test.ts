import test from "node:test";
import assert from "node:assert";
import { Button } from "./index.ts";

test("Button component", async (t) => {
  await t.test("preserves label and uses default disabled value", () => {
    const btn = Button({ label: "Click Me" });
    assert.strictEqual(btn.type, "button");
    assert.strictEqual(btn.label, "Click Me");
    assert.strictEqual(btn.disabled, false);
  });

  await t.test("uses explicit disabled value", () => {
    const btn = Button({ label: "Submit", disabled: true });
    assert.strictEqual(btn.type, "button");
    assert.strictEqual(btn.label, "Submit");
    assert.strictEqual(btn.disabled, true);
  });
});
