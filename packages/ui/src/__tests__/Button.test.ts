import { describe, it, expect } from "vitest";
import { Button } from "../index";

/**
 * Unit tests for the shared Button stub component.
 * Covers label rendering and disabled state behavior.
 */

describe("Button", () => {
  it("should return an object with the correct label", () => {
    const result = Button({ label: "Click Me" });
    expect(result).toEqual({
      type: "button",
      label: "Click Me",
      disabled: false,
    });
  });

  it("should default disabled to false when not provided", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("should set disabled to true when explicitly passed", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
    expect(result.label).toBe("Disabled");
  });

  it("should always have type as button", () => {
    const result = Button({ label: "Test" });
    expect(result.type).toBe("button");
  });

  it("should handle empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });
});
