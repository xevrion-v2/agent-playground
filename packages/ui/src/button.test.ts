import { test } from "node:test";
import assert from "node:assert/strict";
import { Button, type ButtonProps } from "./index";

test("renders label", () => {
  const b = Button({ label: "Submit" });
  assert.equal(b.label, "Submit");
  assert.equal(b.type, "button");
});
test("disabled defaults to false", () => {
  const b = Button({ label: "Go" });
  assert.equal(b.disabled, false);
});
test("respects explicit disabled=true", () => {
  const b = Button({ label: "Stop", disabled: true });
  assert.equal(b.disabled, true);
});
test("accepts optional name prop shape", () => {
  const props: ButtonProps = { label: "X", disabled: true };
  const b = Button(props);
  assert.equal(b.label, "X");
  assert.equal(b.disabled, true);
});
