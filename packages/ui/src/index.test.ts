import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button, ButtonProps } from "./index";

describe("Button", () => {
  it("should return an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
  });

  it("should include the provided label", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.label, "Submit");
  });

  it("should default disabled to false", () => {
    const result = Button({ label: "OK" });
    assert.equal(result.disabled, false);
  });

  it("should accept and return disabled as true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("should return disabled as false when explicitly set", () => {
    const result = Button({ label: "Active", disabled: false });
    assert.equal(result.disabled, false);
  });

  it("should handle empty label gracefully", () => {
    const result = Button({ label: "" });
    assert.equal(result.label, "");
    assert.equal(result.type, "button");
  });

  it("should handle special characters in label", () => {
    const result = Button({ label: "Save & Exit" });
    assert.equal(result.label, "Save & Exit");
  });
});

describe("ButtonProps type", () => {
  it("should accept props with only label", () => {
    const props: ButtonProps = { label: "Test" };
    assert.equal(props.label, "Test");
    assert.equal(props.disabled, undefined);
  });

  it("should accept props with label and disabled", () => {
    const props: ButtonProps = { label: "Test", disabled: true };
    assert.equal(props.disabled, true);
  });
});
