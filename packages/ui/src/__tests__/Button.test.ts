import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button, ButtonProps } from "../index.js";

describe("Button component", () => {
  it("should return an object with correct type", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
  });

  it("should include the provided label", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.label, "Submit");
  });

  it("should default disabled to false", () => {
    const result = Button({ label: "Click" });
    assert.equal(result.disabled, false);
  });

  it("should set disabled to true when specified", () => {
    const result = Button({ label: "Click", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("should set disabled to false when explicitly set", () => {
    const result = Button({ label: "Click", disabled: false });
    assert.equal(result.disabled, false);
  });

  it("should handle empty label", () => {
    const result = Button({ label: "" });
    assert.equal(result.label, "");
  });

  it("should handle long label strings", () => {
    const longLabel = "A".repeat(1000);
    const result = Button({ label: longLabel });
    assert.equal(result.label, longLabel);
  });

  it("should handle special characters in label", () => {
    const result = Button({ label: '<script>alert("xss")</script>' });
    assert.equal(result.label, '<script>alert("xss")</script>');
  });

  it("should handle unicode in label", () => {
    const result = Button({ label: "按钮 🎉" });
    assert.equal(result.label, "按钮 🎉");
  });
});
