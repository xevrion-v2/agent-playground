import { describe, it, expect } from "vitest";
import * as React from "react";
import { Button } from "./index";

describe("Button component", () => {
  it("renders a button with correct label", () => {
    const buttonElement = Button({ label: "Submit" });
    expect(buttonElement.type).toBe("button");
    expect(buttonElement.props.children).toBe("Submit");
  });

  it("renders a disabled button when disabled is true", () => {
    const buttonElement = Button({ label: "Submit", disabled: true });
    expect(buttonElement.props.disabled).toBe(true);
  });

  it("renders an enabled button by default", () => {
    const buttonElement = Button({ label: "Submit" });
    expect(buttonElement.props.disabled).toBe(false);
  });
});
