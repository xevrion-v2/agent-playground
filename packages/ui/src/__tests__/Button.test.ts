import { describe, it, expect } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  it("should return the correct label", () => {
    const btn = Button({ label: "Click me" });
    expect(btn.label).toBe("Click me");
  });

  it("should return type 'button'", () => {
    const btn = Button({ label: "Test" });
    expect(btn.type).toBe("button");
  });

  it("should default disabled to false", () => {
    const btn = Button({ label: "Test" });
    expect(btn.disabled).toBe(false);
  });

  it("should respect disabled=true", () => {
    const btn = Button({ label: "Test", disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it("should return all expected fields", () => {
    const btn = Button({ label: "Save" });
    expect(btn).toEqual({
      type: "button",
      label: "Save",
      disabled: false,
    });
  });
});
