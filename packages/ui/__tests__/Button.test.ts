import { describe, it, expect } from "vitest";
import { Button } from "../src";

describe("Button", () => {
  it("renders with label", () => {
    expect(Button({ label: "Click me" })).toEqual({ type: "button", label: "Click me", disabled: false });
  });
  it("renders disabled when true", () => {
    expect(Button({ label: "Submit", disabled: true })).toEqual({ type: "button", label: "Submit", disabled: true });
  });
  it("defaults disabled to false", () => {
    expect(Button({ label: "Cancel" }).disabled).toBe(false);
  });
  it("accepts empty label", () => {
    expect(Button({ label: "" }).label).toBe("");
  });
});
