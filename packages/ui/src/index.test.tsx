import assert from "node:assert/strict";
import { isValidElement } from "react";

import { Button } from "./index";

const button = Button({ label: "Save", "aria-label": "Save item" });

assert.equal(isValidElement(button), true);
assert.equal(button.type, "button");
assert.equal(button.props.children, "Save");
assert.equal(button.props.disabled, false);
assert.equal(button.props.type, "button");
assert.equal(button.props["aria-label"], "Save item");

const submitButton = Button({
  label: "Submit",
  disabled: true,
  type: "submit"
});

assert.equal(submitButton.type, "button");
assert.equal(submitButton.props.children, "Submit");
assert.equal(submitButton.props.disabled, true);
assert.equal(submitButton.props.type, "submit");
