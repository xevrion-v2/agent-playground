import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { Button, ButtonProps } from "./index";

describe("Button", () => {
  it("returns object with type: 'button'", () => {
    const result = Button({ label: "Click me" });
    assert.equal(result.type, "button");
  });

  it("label is propagated correctly", () => {
    const result = Button({ label: "Submit" });
    assert.equal(result.label, "Submit");
  });

  it("disabled defaults to false", () => {
    const result = Button({ label: "Click" });
    assert.equal(result.disabled, false);
  });

  it("disabled can be set to true", () => {
    const result = Button({ label: "Click", disabled: true });
    assert.equal(result.disabled, true);
  });

  it("disabled can be explicitly set to false", () => {
    const result = Button({ label: "Click", disabled: false });
    assert.equal(result.disabled, false);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    assert.equal(result.label, "");
    assert.equal(result.type, "button");
  });

  it("handles special characters in label", () => {
    const result = Button({ label: "Save & Close!" });
    assert.equal(result.label, "Save & Close!");
  });

  it("ButtonProps type enforces label as required string", () => {
    const props: ButtonProps = { label: "test", disabled: false };
    assert.equal(typeof props.label, "string");
    assert.equal(typeof props.disabled, "boolean");
  });
});
