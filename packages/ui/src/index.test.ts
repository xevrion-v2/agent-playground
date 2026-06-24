import { Button } from "./index";

/**
 * Button component tests — covers label, disabled prop, and type annotation.
 */

describe("Button", () => {
  it("renders with the provided label", () => {
    const result = Button({ label: "Click me" });
    expect(result.label).toBe("Click me");
    expect(result.type).toBe("button");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("respects the disabled prop when true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.type).toBe("button");
  });

  it("returns correct type annotation", () => {
    const result = Button({ label: "Test" });
    expect(typeof result).toBe("object");
    expect(result).toHaveProperty("type", "button");
    expect(result).toHaveProperty("label");
    expect(result).toHaveProperty("disabled");
  });
});
