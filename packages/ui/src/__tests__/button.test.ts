import { describe, it, expect } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  it("returns a button object with the correct label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("sets disabled to false by default", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("sets disabled to true when explicitly passed", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("preserves the type field as 'button'", () => {
    const result = Button({ label: "Save" });
    expect(result.type).toBe("button");
  });
});
