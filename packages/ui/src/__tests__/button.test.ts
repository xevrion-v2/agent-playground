import { describe, it, expect } from "vitest";
import { Button } from ".";

describe("Button", () => {
  it("should return a button with the given label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("should set disabled to false by default", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("should respect the disabled prop when true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should handle empty label", () => {
    const result = Button({ label: "" });
    expect(result).toHaveProperty("type", "button");
    expect(result).toHaveProperty("label", "");
    expect(result).toHaveProperty("disabled", false);
  });

  it("should preserve the type field as button", () => {
    const result = Button({ label: "Cancel" });
    expect(result.type).toBe("button");
  });
});
