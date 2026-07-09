import { describe, it, expect } from "vitest";
import { Button, ButtonProps } from "../index";

describe("Button", () => {
  it("returns an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    expect(result).toBeDefined();
    expect(result.type).toBe("button");
  });

  it("renders the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("accepts an explicit disabled value", () => {
    const result = Button({ label: "Click me", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("preserves label when disabled is true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.label).toBe("Save");
    expect(result.disabled).toBe(true);
  });

  it("works with empty label string", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.disabled).toBe(false);
  });

  it("works with long label strings", () => {
    const longLabel = "A".repeat(1000);
    const result = Button({ label: longLabel });
    expect(result.label).toBe(longLabel);
    expect(result.label.length).toBe(1000);
  });

});
