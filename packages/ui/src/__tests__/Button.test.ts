import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button", () => {
  it("returns a button descriptor with the given label", () => {
    const result = Button({ label: "Click me" });
    expect(result.label).toBe("Click me");
  });

  it("has type 'button' by default", () => {
    const result = Button({ label: "Submit" });
    expect(result.type).toBe("button");
  });

  it("is not disabled by default", () => {
    const result = Button({ label: "Save" });
    expect(result.disabled).toBe(false);
  });

  it("respects the disabled prop when set to true", () => {
    const result = Button({ label: "Save", disabled: true });
    expect(result.disabled).toBe(true);
  });

  it("respects the disabled prop when set to false", () => {
    const result = Button({ label: "Save", disabled: false });
    expect(result.disabled).toBe(false);
  });
});
