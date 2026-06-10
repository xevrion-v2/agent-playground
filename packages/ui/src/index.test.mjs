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

test("Button returns the expected button object shape", () => {
  assert.deepEqual(Button({ label: "Save" }), {
    type: "button",
    label: "Save",
    disabled: false,
  });
});

test("Button defaults disabled to false", () => {
  assert.equal(Button({ label: "Save" }).disabled, false);
});

test("Button preserves explicit disabled values", () => {
  assert.equal(Button({ label: "Save", disabled: true }).disabled, true);
  assert.equal(Button({ label: "Save", disabled: false }).disabled, false);
});

test("Button preserves edge-case label strings", () => {
  assert.equal(Button({ label: "" }).label, "");

  const longLabel = "A".repeat(1000);
  assert.equal(Button({ label: longLabel }).label, longLabel);

  const specialLabel = '<script>alert("xss")</script>';
  assert.equal(Button({ label: specialLabel }).label, specialLabel);
});
