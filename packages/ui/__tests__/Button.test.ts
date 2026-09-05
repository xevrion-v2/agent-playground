import { describe, it, expect } from "vitest";
import { Button, type ButtonProps } from "../src/index";

describe("Button", () => {
  it("returns a button descriptor with the given label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false
    });
  });

  it("sets disabled to true when specified", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "OK" });
    expect(result.disabled).toBe(false);
  });

  it("preserves label when disabled is true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.type).toBe("button");
    expect(result.label).toBe("Save");
  });
});
