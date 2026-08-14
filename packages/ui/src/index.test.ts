import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button } from "./index.js";

describe("Button component stub", () => {
  it("should return correct label when passed in props", () => {
    const props = { label: "Submit" };
    const result = Button(props);
    
    assert.equal(result.type, "button");
    assert.equal(result.label, "Submit");
  });

  it("should default disabled to false when not provided", () => {
    const props = { label: "Click Me" };
    const result = Button(props);
    
    assert.equal(result.disabled, false);
  });

  it("should set disabled to true when passed as true in props", () => {
    const props = { label: "Save", disabled: true };
    const result = Button(props);
    
    assert.equal(result.disabled, true);
  });

  it("should set disabled to false when explicitly passed as false in props", () => {
    const props = { label: "Cancel", disabled: false };
    const result = Button(props);
    
    assert.equal(result.disabled, false);
  });
});
