import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("returns an object with type 'button' and the provided label", () => {
    const result = Button({ label: "Submit" });

    expect(result).toEqual({
      type: "button",
      label: "Submit",
      disabled: false,
    });
  });

  it("sets disabled to false by default", () => {
    const result = Button({ label: "Click me" });

    expect(result.disabled).toBe(false);
  });

  it("sets disabled to true when disabled prop is true", () => {
    const result = Button({ label: "Disabled", disabled: true });

    expect(result.disabled).toBe(true);
  });

  it("preserves the label when disabled", () => {
    const result = Button({ label: "Save", disabled: true });

    expect(result.label).toBe("Save");
    expect(result.type).toBe("button");
  });
});
