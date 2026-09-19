import { describe, it, expect } from "vitest";
import { Button } from "../src/index";

describe("Button", () => {
  it("creates a button with label", () => {
    const btn = Button({ label: "Click me" });
    expect(btn.type).toBe("button");
    expect(btn.label).toBe("Click me");
    expect(btn.disabled).toBe(false);
  });

  it("creates a disabled button", () => {
    const btn = Button({ label: "Submit", disabled: true });
    expect(btn.type).toBe("button");
    expect(btn.label).toBe("Submit");
    expect(btn.disabled).toBe(true);
  });

  it("defaults disabled to false", () => {
    const btn = Button({ label: "OK" });
    expect(btn.disabled).toBe(false);
  });

  it("preserves all props", () => {
    const btn = Button({ label: "Save" });
    expect(btn).toHaveProperty("type");
    expect(btn).toHaveProperty("label");
    expect(btn).toHaveProperty("disabled");
  });
});
