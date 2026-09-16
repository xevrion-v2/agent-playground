import { describe, it } from "node:test";
import assert from "node:assert";
import { Button, ButtonProps } from "../index";

describe("Button Component", () => {
  it("should render with required props", () => {
    const result = Button({ label: "Click me" });
    assert.strictEqual(result.type, "button");
    assert.strictEqual(result.label, "Click me");
    assert.strictEqual(result.disabled, false);
  });

  it("should accept optional props", () => {
    const props: ButtonProps = {
      label: "Submit",
      disabled: true,
      variant: "primary",
    };
    const result = Button(props);
    assert.strictEqual(result.disabled, true);
    assert.strictEqual(result.variant, "primary");
  });
});
