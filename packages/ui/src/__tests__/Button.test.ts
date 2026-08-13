import { describe, it, expect } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  it("returns an object with type, label, and disabled", () => {
    const result = Button({ label: "Submit" });

    expect(result).toHaveProperty("type", "button");
    expect(result).toHaveProperty("label", "Submit");
    expect(result).toHaveProperty("disabled", false);
  });

  it("uses the provided label", () => {
    const result = Button({ label: "Click me" });

    expect(result.label).toBe("Click me");
  });

  it("defaults disabled to false when not provided", () => {
    const result = Button({ label: "OK" });

    expect(result.disabled).toBe(false);
  });

  it("respects disabled when set to true", () => {
    const result = Button({ label: "Submit", disabled: true });

    expect(result.disabled).toBe(true);
  });

  it("always returns type as 'button'", () => {
    const result = Button({ label: "Test", disabled: true });

    expect(result.type).toBe("button");
  });
});
