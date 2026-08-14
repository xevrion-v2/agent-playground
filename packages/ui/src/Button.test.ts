import test from "node:test";
import assert from "node:assert/strict";
import { Button, ButtonProps } from "./index";

test("Button returns correct type and label", () => {
  const result = Button({ label: "Submit" });
  assert.equal(result.type, "button");
  assert.equal(result.label, "Submit");
  assert.equal(result.disabled, false);
});

test("Button respects disabled prop", () => {
  const result = Button({ label: "Cancel", disabled: true });
  assert.equal(result.disabled, true);
});

test("ButtonProps accepts readonly fields", () => {
  const props: ButtonProps = { label: "test", disabled: true };
  assert.equal(props.label, "test");
});
