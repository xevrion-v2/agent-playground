import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Button } from "./index";

describe("Button", () => {
  it("returns the provided label", () => {
    assert.deepEqual(Button({ label: "Save" }), {
      type: "button",
      label: "Save",
      disabled: false
    });
  });

  it("preserves explicit disabled state", () => {
    assert.deepEqual(Button({ label: "Delete", disabled: true }), {
      type: "button",
      label: "Delete",
      disabled: true
    });
  });
});
