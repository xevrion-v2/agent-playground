import { describe, it } from "node:test";
import assert from "node:assert";
import { Button, ButtonProps } from "./index";

describe("Button", () => {
  it("returns a button object with the given label", () => {
    const result = Button({ label: "Submit" });
    assert.strictEqual(result.type, "button");
    assert.strictEqual(result.label, "Submit");
    assert.strictEqual(result.disabled, false);
  });

  it("defaults disabled to false when not provided", () => {
    const result = Button({ label: "OK" } as ButtonProps);
    assert.strictEqual(result.disabled, false);
  });

  it("sets disabled to true when explicitly passed", () => {
    const result = Button({ label: "Save", disabled: true });
    assert.strictEqual(result.disabled, true);
  });

  it("returns correct shape with type field", () => {
    const result = Button({ label: "Cancel" } as ButtonProps);
    assert.deepStrictEqual(result, {
      type: "button",
      label: "Cancel",
      disabled: false,
    });
  });
});
