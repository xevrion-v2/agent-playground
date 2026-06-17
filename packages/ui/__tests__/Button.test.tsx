import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../src/Button";

describe("Button", () => {
  it("renders with the given label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeDefined();
  });
  it("is disabled when disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByText("Disabled");
    expect((button as HTMLButtonElement).disabled).toBe(true);
  });
  it("is enabled by default", () => {
    render(<Button label="Enabled" />);
    const button = screen.getByText("Enabled");
    expect((button as HTMLButtonElement).disabled).toBe(false);
  });
  it("applies variant data attribute", () => {
    render(<Button label="Primary" variant="primary" />);
    expect(screen.getByText("Primary").getAttribute("data-variant")).toBe("primary");
  });
});
