import { describe, it, expect } from "vitest";
import { Button } from "../index.js";

describe("Button", () => {
  it("returns an object with the correct label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("defaults disabled to false when not provided", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("sets disabled to true when specified", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
    expect(result.type).toBe("button");
  });

  it("always sets type to button", () => {
    const result = Button({ label: "Test" });
    expect(result.type).toBe("button");
  });
});
