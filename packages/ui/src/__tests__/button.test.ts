import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button } from "../index";

describe("Button", () => {
  it("returns correct object with label", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
    assert.equal(result.label, "Click me");
    assert.equal(result.disabled, false);
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.disabled, false);
  });

  it("respects disabled = true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("respects disabled = false", () => {
    const result = Button({ label: "Active", disabled: false });
    assert.equal(result.disabled, false);
  });

  it("always returns type button", () => {
    const cases = [
      { label: "a" },
      { label: "b", disabled: true },
      { label: "c", disabled: false },
    ];
    for (const props of cases) {
      assert.equal(Button(props).type, "button");
    }
  });
});
