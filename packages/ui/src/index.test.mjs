import assert from "node:assert/strict";
import test from "node:test";

function Button({ label, disabled = false }) {
  return {
    type: "button",
    label,
    disabled,
  };
}

test("Button preserves the provided label", () => {
  assert.equal(Button({ label: "Save" }).label, "Save");
});

test("Button defaults disabled to false", () => {
  assert.equal(Button({ label: "Save" }).disabled, false);
});

test("Button preserves explicit disabled values", () => {
  assert.equal(Button({ label: "Save", disabled: true }).disabled, true);
});
