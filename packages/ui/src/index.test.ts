import test from "node:test";
import assert from "node:assert/strict";

import { Button } from "./index.js";

test("Button exposes the provided label", () => {
  const button = Button({ label: "Save changes" });

  assert.equal(button.label, "Save changes");
  assert.equal(button.type, "button");
});

test("Button preserves disabled values", () => {
  assert.equal(Button({ label: "Submit", disabled: true }).disabled, true);
  assert.equal(Button({ label: "Submit", disabled: false }).disabled, false);
});
