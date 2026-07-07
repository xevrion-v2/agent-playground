import { describe, it, expect } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  it("should return an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    expect(result).toBeDefined();
    expect(result.type).toBe("button");
  });

  it("should return an object with the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("should default disabled to false when not provided", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("should set disabled to true when explicitly passed", () => {
    const result = Button({ label: "Click me", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should set disabled to false when explicitly passed as false", () => {
    const result = Button({ label: "Click me", disabled: false });
    expect(result.disabled).toBe(false);
  });

  it("should handle empty string label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.type).toBe("button");
    expect(result.disabled).toBe(false);
  });

  it("should handle label with special characters", () => {
    const result = Button({ label: "Save & Continue" });
    expect(result.label).toBe("Save & Continue");
  });

  it("should not mutate the input props", () => {
    const props = { label: "Delete", disabled: true };
    const result = Button(props);
    expect(result.label).toBe("Delete");
    expect(result.disabled).toBe(true);
    // Verify original object is unchanged
    expect(props).toEqual({ label: "Delete", disabled: true });
  });

  it("should return a new object each time it is called", () => {
    const result1 = Button({ label: "A" });
    const result2 = Button({ label: "A" });
    expect(result1).not.toBe(result2);
    expect(result1).toEqual(result2);
  });

  it("should only have type, label, and disabled properties", () => {
    const result = Button({ label: "test" });
    const keys = Object.keys(result);
    expect(keys).toHaveLength(3);
    expect(keys).toContain("type");
    expect(keys).toContain("label");
    expect(keys).toContain("disabled");
  });
});
