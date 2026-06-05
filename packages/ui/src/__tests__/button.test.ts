import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button } from "../index.js";

describe("Button", () => {
  it("preserves the provided label", () => {
    const btn = Button({ label: "Submit" });
    assert.equal(btn.label, "Submit");
  });

  it("defaults disabled to false", () => {
    const btn = Button({ label: "Go" });
    assert.equal(btn.disabled, false);
  });

  it("preserves an explicit disabled true value", () => {
    const btn = Button({ label: "Wait", disabled: true });
    assert.equal(btn.disabled, true);
  });

  it("returns type button", () => {
    const btn = Button({ label: "X" });
    assert.equal(btn.type, "button");
  });
});
