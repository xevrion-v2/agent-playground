import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Button } from "./index.ts";

describe("Button", () => {
  it("preserves the provided label", () => {
    assert.equal(Button({ label: "Save task" }).label, "Save task");
  });

  it("defaults disabled to false", () => {
    assert.equal(Button({ label: "Create task" }).disabled, false);
  });

  it("preserves an explicit disabled value", () => {
    assert.equal(Button({ label: "Submit", disabled: true }).disabled, true);
  });
});
