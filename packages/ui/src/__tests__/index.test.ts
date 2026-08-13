import { describe, it, expect } from "vitest";
import { Button, ButtonProps } from "../index";

describe("Button", () => {
  it("returns a button object with the correct type", () => {
    const result = Button({ label: "Click me" });
    expect(result).toHaveProperty("type", "button");
  });

  it("returns the provided label", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Default" });
    expect(result.disabled).toBe(false);
  });

  it("accepts an explicit disabled value of true", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("accepts an explicit disabled value of false", () => {
    const result = Button({ label: "Enabled", disabled: false });
    expect(result.disabled).toBe(false);
  });

  it("handles an empty label string", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.disabled).toBe(false);
  });

  it("preserves all returned properties", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result).toEqual({
      type: "button",
      label: "Save",
      disabled: true,
    });
  });

  it("supports the ButtonProps type contract", () => {
    const props: ButtonProps = { label: "Test", disabled: true };
    const result = Button(props);
    expect(result.label).toBe("Test");
    expect(result.disabled).toBe(true);
  });
});
