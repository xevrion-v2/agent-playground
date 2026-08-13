/**
 * Unit tests for Button stub component (#13)
 */
import { describe, it, expect } from "vitest";
import { Button } from "../src/index";

describe("Button", () => {
  it("renders with label", () => {
    const result = Button({ label: "Click me" });
    expect(result.label).toBe("Click me");
  });

  it("defaults disabled to false", () => {
    const result = Button({ label: "Submit" });
    expect(result.disabled).toBe(false);
  });

  it("respects disabled prop", () => {
    const result = Button({ label: "Submit", disabled: true });
    expect(result.disabled).toBe(true);
  });
});
