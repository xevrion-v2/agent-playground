import { describe, it, expect } from "vitest";
import { Button } from "./index.js";

describe("Button", () => {
  it("should return correct label and default disabled state", () => {
    const result = Button({ label: "Click Me" });
    expect(result).toEqual({
      type: "button",
      label: "Click Me",
      disabled: false,
    });
  });

  it("should respect disabled=true when provided", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result).toEqual({
      type: "button",
      label: "Submit",
      disabled: true,
    });
  });

  it("should handle empty label string", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.disabled).toBe(false);
  });
});
