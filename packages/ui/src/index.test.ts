import { describe, it, expect } from "vitest";
import { Button, ButtonProps } from "./index";

describe("Button", () => {
  it("returns a button object with correct type", () => {
    const result = Button({ label: "Click me" });
    expect(result.type).toBe("button");
  });

  it("sets the label correctly", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "OK" });
    expect(result.disabled).toBe(false);
  });

  it("sets disabled to true when provided", () => {
    const result = Button({ label: "OK", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("handles empty label", () => {
    const result = Button({ label: "" });
    expect(result.label).toBe("");
    expect(result.type).toBe("button");
  });

  it("preserves all props in returned object", () => {
    const props: ButtonProps = { label: "Save", disabled: true };
    const result = Button(props);
    expect(result).toEqual({
      type: "button",
      label: "Save",
      disabled: true,
    });
  });
});
