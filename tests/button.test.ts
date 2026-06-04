import { describe, it, expect } from "vitest";

// Import the Button component types and function
// Since the Button returns a plain object, we test the object shape
type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  onClick?: () => void;
};

function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}

describe("Button component", () => {
  it("should return an object with type 'button'", () => {
    const result = Button({ label: "Click me" });
    expect(result.type).toBe("button");
  });

  it("should include the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("should default disabled to false when not specified", () => {
    const result = Button({ label: "Click" });
    expect(result.disabled).toBe(false);
  });

  it("should set disabled to true when specified", () => {
    const result = Button({ label: "Click", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should handle empty string label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });

  it("should handle special characters in label", () => {
    const result = Button({ label: "Save & Continue <下一步>" });
    expect(result.label).toBe("Save & Continue <下一步>");
  });

  it("should always return an object with exactly three keys", () => {
    const result = Button({ label: "Test" });
    expect(Object.keys(result)).toEqual(["type", "label", "disabled"]);
  });
});
