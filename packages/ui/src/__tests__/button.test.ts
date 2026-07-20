import { describe, it, expect } from "vitest";
import { Button, type ButtonProps } from "../index";

describe("Button", () => {
  it("returns an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    expect(result).toHaveProperty("type", "button");
  });

  it("uses the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Save" });
    expect(result.disabled).toBe(false);
  });

  it("allows overriding disabled to true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("does not modify the input props (immutability check)", () => {
    const props: ButtonProps = { label: "Test", disabled: false };
    const frozen = { ...props };
    Button(props);
    expect(props).toEqual(frozen);
  });
});
