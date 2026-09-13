import assert from "node:assert/strict";
import test from "node:test";
import { isValidElement } from "react";

import { Button } from "./index";

test("Button returns a React button element", () => {
  const element = Button({
    label: "Save task",
    disabled: true,
  });

  assert.equal(isValidElement(element), true);
  assert.equal(element.type, "button");
  assert.equal(element.props.disabled, true);
  assert.equal(element.props.children, "Save task");
});

test("Button defaults disabled to false", () => {
  const element = Button({
    label: "Create task",
  });

  assert.equal(isValidElement(element), true);
  assert.equal(element.props.disabled, false);
});
