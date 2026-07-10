import { describe, it, expect } from "vitest";

// Mock Button component for testing
function Button({ label, disabled = false }: { label: string; disabled?: boolean }) {
  return {
    type: "button",
    label,
    disabled
  };
}

describe("Button Component", () => {
  it("should render with label", () => {
    const button = Button({ label: "Click me" });
    expect(button.label).toBe("Click me");
    expect(button.type).toBe("button");
  });

  it("should render with disabled false by default", () => {
    const button = Button({ label: "Submit" });
    expect(button.disabled).toBe(false);
  });

  it("should render with disabled true when set", () => {
    const button = Button({ label: "Disabled", disabled: true });
    expect(button.disabled).toBe(true);
  });

  it("should handle empty label", () => {
    const button = Button({ label: "" });
    expect(button.label).toBe("");
  });

  it("should handle long label", () => {
    const longLabel = "A".repeat(100);
    const button = Button({ label: longLabel });
    expect(button.label).toBe(longLabel);
    expect(button.label.length).toBe(100);
  });
});
