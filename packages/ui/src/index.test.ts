import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Button } from "./index";

describe("Button", () => {
  it("preserves the label and defaults disabled to false", () => {
    assert.deepEqual(Button({ label: "Save" }), {
      type: "button",
      label: "Save",
      disabled: false
    });
  });

  it("preserves an explicit disabled value", () => {
    assert.equal(Button({ label: "Submit", disabled: true }).disabled, true);
    assert.equal(Button({ label: "Cancel", disabled: false }).disabled, false);
  });
});
