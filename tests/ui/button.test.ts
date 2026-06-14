import { describe, it, expect } from "vitest";
import { Button } from "../../packages/ui/src/index";

describe("Button", () => {
  it("should return correct type", () => {
    const result = Button({ label: "Click me" });
    expect(result.type).toBe("button");
  });

  it("should return correct label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("should default disabled to false", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("should accept disabled prop", () => {
    const result = Button({ label: "Click me", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should handle empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });
});
