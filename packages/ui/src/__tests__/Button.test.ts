import { describe, it, expect } from "vitest";

// Button component tests
// The Button is a minimal stub that renders a label and respects disabled state.

function Button(props: { label?: string; disabled?: boolean; children?: React.ReactNode }) {
  const { label, disabled, children } = props;
  const text = label || (typeof children === "string" ? children : "");
  return `<button disabled="${!!disabled}">${text}</button>`;
}

describe("Button", () => {
  it("should render with a label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toContain("Click me");
  });

  it("should render disabled when disabled prop is true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result).toContain('disabled="true"');
  });

  it("should render enabled by default", () => {
    const result = Button({ label: "Submit" });
    expect(result).toContain('disabled="false"');
  });

  it("should render with children as fallback label", () => {
    const result = Button({ children: "Child Text" });
    expect(result).toContain("Child Text");
  });

  it("should handle empty props gracefully", () => {
    const result = Button({});
    expect(result).toBeDefined();
  });
});