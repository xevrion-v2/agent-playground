import { describe, it, expect } from "vitest";
import { Button } from "../index.js";

describe("Button", () => {
  it("returns correct button object with label", () => {
    const result = Button({ label: "Click me" });
    expect(result.label).toBe("Click me");
  });

  it("default disabled is false", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("explicit disabled=true works", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("preserves type field", () => {
    const result = Button({ label: "Test" });
    expect(result.type).toBe("button");
  });
});
