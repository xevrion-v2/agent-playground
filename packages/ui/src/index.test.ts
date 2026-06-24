import { Button, ButtonProps } from "../src";

describe("Button", () => {
  it("returns correct shape with label", () => {
    const result = Button({ label: "Click me" });
    expect(result).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("respects disabled prop", () => {
    const result = Button({ label: "Disabled", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Active" });
    expect(result.disabled).toBe(false);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
  });

  it("preserves type annotation", () => {
    const result = Button({ label: "Test" });
    expect(result.type).toBe("button");
  });
});
