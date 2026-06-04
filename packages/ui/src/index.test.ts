import { describe, it, expect } from "vitest";
import { Button } from "./index";

describe("Button UI component stub", () => {
  it("should return the correct structure with a given label", () => {
    const button = Button({ label: "Click me" });
    expect(button).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });

  it("should respect the disabled property when set to true", () => {
    const button = Button({ label: "Click me", disabled: true });
    expect(button).toEqual({
      type: "button",
      label: "Click me",
      disabled: true,
    });
  });

  it("should respect the disabled property when set to false explicitly", () => {
    const button = Button({ label: "Click me", disabled: false });
    expect(button).toEqual({
      type: "button",
      label: "Click me",
      disabled: false,
    });
  });
});
