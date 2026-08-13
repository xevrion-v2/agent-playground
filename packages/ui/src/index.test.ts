import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button } from "../src/index";

describe("Button", () => {
  it("returns an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
  });

  it("includes the label in the returned object", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.label, "Submit");
  });

  it("defaults disabled to false when not provided", () => {
    const result = Button({ label: "OK" });
    assert.equal(result.disabled, false);
  });

  it("sets disabled to true when provided", () => {
    const result = Button({ label: "Nope", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("handles an empty string label", () => {
    const result = Button({ label: "" });
    assert.equal(result.label, "");
  });
});
