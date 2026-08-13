import { describe, it, expect } from "vitest";
import { Button, ButtonProps } from "../src";

describe("Button", () => {
  it("renders with label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({ type: "button", label: "Click me", disabled: false });
  });

  it("renders disabled when disabled is true", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result).toEqual({ type: "button", label: "Submit", disabled: true });
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Cancel" });
    expect(result.disabled).toBe(false);
  });

  it("accepts empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });
});
