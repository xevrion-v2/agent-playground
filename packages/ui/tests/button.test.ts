import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { Button } from "../src/index.ts";

describe("Button", () => {
  it("returns the provided label", () => {
    assert.equal(Button({ label: "Save" }).label, "Save");
  });

  it("defaults disabled to false", () => {
    assert.equal(Button({ label: "Go" }).disabled, false);
  });

  it("honours disabled=true", () => {
    assert.equal(Button({ label: "Go", disabled: true }).disabled, true);
  });
});
