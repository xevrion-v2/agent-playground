import { Button, ButtonProps } from "../src";

describe("Button", () => {
  it("returns a button object with the provided label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("respects the disabled prop when true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("handles empty label string", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });
});
