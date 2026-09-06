import { describe, it, expect } from "vitest";
import { Button, type ButtonProps, type ButtonOutput } from "../src/index";

describe("Button", () => {
  it("returns type 'button'", () => {
    const result = Button({ label: "Click me" });
    expect(result.type).toBe("button");
  });

  it("passes the label through", () => {
    const result = Button({ label: "Save" });
    expect(result.label).toBe("Save");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Ok" });
    expect(result.disabled).toBe(false);
  });

  it("respects disabled=true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("respects disabled=false", () => {
    const result = Button({ label: "Enabled", disabled: false });
    expect(result.disabled).toBe(false);
  });

  it("returns a plain object (not a class instance)", () => {
    const result = Button({ label: "Plain" });
    expect(result).toStrictEqual({ type: "button", label: "Plain", disabled: false });
  });
});
