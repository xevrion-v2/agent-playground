import { describe, it, expect } from "vitest";
import { Button } from "../index.js";

describe("Button", () => {
  it("returns an object with type 'button'", () => {
    const btn = Button({ label: "Click me" });
    expect(btn.type).toBe("button");
  });

  it("sets the label correctly", () => {
    const btn = Button({ label: "Submit" });
    expect(btn.label).toBe("Submit");
  });

  it("defaults disabled to false when not provided", () => {
    const btn = Button({ label: "Save" });
    expect(btn.disabled).toBe(false);
  });

  it("respects disabled=true", () => {
    const btn = Button({ label: "Delete", disabled: true });
    expect(btn.disabled).toBe(true);
  });

  it("respects disabled=false explicitly", () => {
    const btn = Button({ label: "Cancel", disabled: false });
    expect(btn.disabled).toBe(false);
  });

  it("reflects a different label value", () => {
    const btn = Button({ label: "Open" });
    expect(btn.label).toBe("Open");
  });
});
