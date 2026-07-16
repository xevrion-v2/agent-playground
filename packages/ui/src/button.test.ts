import { describe, it } from "node:test";
import assert from "node:assert";
import { Button } from "./index.js";

/**
 * Unit tests for the shared Button component stub.
 * Covers label rendering and disabled state behavior.
 */

describe("Button Component", () => {
  it("should return correct element type", () => {
    const btn = Button({ label: "Click me" });
    assert.strictEqual(btn.type, "button");
  });

  it("should return the provided label", () => {
    const btn = Button({ label: "Submit" });
    assert.strictEqual(btn.label, "Submit");
  });

  it("should default disabled to false", () => {
    const btn = Button({ label: "Click me" });
    assert.strictEqual(btn.disabled, false);
  });

  it("should accept disabled=true", () => {
    const btn = Button({ label: "Submit", disabled: true });
    assert.strictEqual(btn.disabled, true);
  });

  it("should accept disabled=false explicitly", () => {
    const btn = Button({ label: "Submit", disabled: false });
    assert.strictEqual(btn.disabled, false);
  });

  it("should include all required properties", () => {
    const btn = Button({ label: "Test" });
    assert.ok("type" in btn, "Should have type property");
    assert.ok("label" in btn, "Should have label property");
    assert.ok("disabled" in btn, "Should have disabled property");
  });
});
