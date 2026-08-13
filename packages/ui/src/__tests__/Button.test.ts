import { describe, it, expect } from "vitest";
import { Button } from "../index";

describe("Button", () => {
  it("should return an object with type set to 'button'", () => {
    const result = Button({ label: "Submit" });
    expect(result.type).toBe("button");
  });

  it("should set the label from props", () => {
    const result = Button({ label: "Submit" });
    expect(result.label).toBe("Submit");
  });

  it("should set disabled to false by default", () => {
    const result = Button({ label: "Click me" });
    expect(result.disabled).toBe(false);
  });

  it("should set disabled to true when passed", () => {
    const result = Button({ label: "Click me", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("should handle an empty label", () => {
    const result = Button({ label: "" });
    expect(result.type).toBe("button");
    expect(result.label).toBe("");
    expect(result.disabled).toBe(false);
  });
});