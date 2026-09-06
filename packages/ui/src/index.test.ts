import { describe, it, expect } from "vitest";
import { Button, type ButtonProps } from "./index";

describe("Button component", () => {
  it("should return button object with label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("should return button object with label and disabled false by default", () => {
    const result = Button({ label: "Submit", disabled: false });
    expect(result).toEqual({
      type: "button",
      label: "Submit",
      disabled: false,
    });
  });

  it("should return button object with disabled true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result).toEqual({
      type: "button",
      label: "Save",
      disabled: true,
    });
  });

  it("should handle empty label string", () => {
    const result = Button({ label: "" });
    expect(result).toEqual({
      type: "button",
      label: "",
      disabled: false,
    });
  });

  it("should handle long label string", () => {
    const longLabel = "A".repeat(1000);
    const result = Button({ label: longLabel });
    expect(result.label).toBe(longLabel);
    expect(result.type).toBe("button");
    expect(result.disabled).toBe(false);
  });

  it("should return consistent type field", () => {
    const result1 = Button({ label: "A" });
    const result2 = Button({ label: "B", disabled: true });
    expect(result1.type).toBe("button");
    expect(result2.type).toBe("button");
  });

  it("should treat undefined disabled as false", () => {
    const props: ButtonProps = { label: "Test" };
    // @ts-expect-error - testing undefined disabled
    const result = Button({ ...props, disabled: undefined });
    expect(result.disabled).toBe(false);
  });

  it("should return new object each call (no shared reference)", () => {
    const result1 = Button({ label: "Test" });
    const result2 = Button({ label: "Test" });
    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  it("should have correct TypeScript types", () => {
    // This test ensures the types are correctly exported
    const props: ButtonProps = { label: "Typed" };
    const result = Button(props);
    expect(typeof result.label).toBe("string");
    expect(typeof result.disabled).toBe("boolean");
    expect(typeof result.type).toBe("string");
  });
});