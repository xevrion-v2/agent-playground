import assert from "node:assert/strict";
import test from "node:test";

import React from "react";

import { Button } from "./index";

test("Button returns a valid React button element", () => {
  const button = Button({ label: "Save", disabled: true, "aria-label": "Save task" });

  assert.equal(React.isValidElement(button), true);
  assert.equal(button.type, "button");
  assert.equal(button.props.children, "Save");
  assert.equal(button.props.disabled, true);
  assert.equal(button.props.type, "button");
  assert.equal(button.props["aria-label"], "Save task");
});

test("Button defaults disabled to false and type to button", () => {
  const button = Button({ label: "Create" });

  assert.equal(React.isValidElement(button), true);
  assert.equal(button.props.children, "Create");
  assert.equal(button.props.disabled, false);
  assert.equal(button.props.type, "button");
});

test("Button allows standard button attributes without changing the label API", () => {
  const onClick = () => undefined;
  const button = Button({
    label: "Submit",
    className: "primary",
    onClick,
    type: "submit"
  });

  assert.equal(button.props.children, "Submit");
  assert.equal(button.props.className, "primary");
  assert.equal(button.props.onClick, onClick);
  assert.equal(button.props.type, "submit");
});
