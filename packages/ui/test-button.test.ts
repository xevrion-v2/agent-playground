import { describe, it, expect } from "vitest";
import { Button, type ButtonProps, type ButtonRenderResult } from "./src/index";

describe("Button", () => {
  it("should return a button descriptor with type, label, and disabled", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({ type: "button", label: "Click me", disabled: false });
  });

  it("should default disabled to false when omitted", () => {
    const result: ButtonRenderResult = Button({ label: "Save" });
    expect(result.disabled).toBe(false);
  });

  it("should pass through disabled when true", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should preserve the label exactly (including emoji)", () => {
    const result = Button({ label: "🚀 Launch" });
    expect(result.label).toBe("🚀 Launch");
  });

  it("should handle an empty label string", () => {
    const result = Button({ label: "" });
    expect(result.type).toBe("button");
    expect(result.label).toBe("");
    expect(result.disabled).toBe(false);
  });
});
