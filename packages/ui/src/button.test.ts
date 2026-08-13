import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button } from "./index.js";

describe("Button", () => {
  it("returns an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
  });

  it("sets the label from props", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.label, "Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "OK" });
    assert.equal(result.disabled, false);
  });

  it("respects disabled=true", () => {
    const result = Button({ label: "Save", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("respects disabled=false explicitly", () => {
    const result = Button({ label: "Cancel", disabled: false });
    assert.equal(result.disabled, false);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    assert.equal(result.label, "");
  });
});
