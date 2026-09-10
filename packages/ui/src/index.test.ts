import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Button } from "./index";

describe("Button", () => {
  it("uses the provided label", () => {
    assert.deepEqual(Button({ label: "Create task" }), {
      type: "button",
      label: "Create task",
      disabled: false
    });
  });

  it("preserves explicit disabled values", () => {
    assert.equal(Button({ label: "Submit", disabled: true }).disabled, true);
    assert.equal(Button({ label: "Cancel", disabled: false }).disabled, false);
  });
});
