import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("renders with label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false
    });
  });

  it("renders disabled state", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });
});
