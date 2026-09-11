/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./index";

describe("Button", () => {
  it("renders with label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { rerender } = render(<Button label="Primary" variant="primary" />);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");

    rerender(<Button label="Secondary" variant="secondary" />);
    expect(screen.getByRole("button")).toHaveClass("btn-secondary");

    rerender(<Button label="Danger" variant="danger" />);
    expect(screen.getByRole("button")).toHaveClass("btn-danger");

    rerender(<Button label="Ghost" variant="ghost" />);
    expect(screen.getByRole("button")).toHaveClass("btn-ghost");
  });

  it("applies size classes", () => {
    const { rerender } = render(<Button label="Small" size="sm" />);
    expect(screen.getByRole("button")).toHaveClass("btn-sm");

    rerender(<Button label="Medium" size="md" />);
    expect(screen.getByRole("button")).toHaveClass("btn-md");

    rerender(<Button label="Large" size="lg" />);
    expect(screen.getByRole("button")).toHaveClass("btn-lg");
  });

  it("disables button when disabled prop is true", () => {
    render(<Button label="Disabled" disabled />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("shows loading state and disables interaction", () => {
    render(<Button label="Loading" loading />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(<Button label="Disabled" disabled onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not call onClick when loading", () => {
    const handleClick = vi.fn();
    render(<Button label="Loading" loading onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies custom className", () => {
    render(<Button label="Custom" className="my-custom-class" />);
    expect(screen.getByRole("button")).toHaveClass("my-custom-class");
  });

  it("uses aria-label when provided", () => {
    render(<Button label="Icon" aria-label="Close dialog" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Close dialog");
  });

  it("falls back to label for aria-label when aria-label not provided", () => {
    render(<Button label="Submit form" />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Submit form");
  });

  it("forwards ref to button element", () => {
    const ref = vi.fn();
    render(<Button label="Ref test" ref={ref} />);
    expect(ref).toHaveBeenCalled();
    const refArg = ref.mock.calls.find((call) => call[0] instanceof HTMLButtonElement);
    expect(refArg).toBeDefined();
    expect(refArg![0]).toBeInstanceOf(HTMLButtonElement);
  });

  it("renders spinner when loading", () => {
    render(<Button label="Loading" loading />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
    expect(screen.getByLabelText("Loading")).toContainHTML("btn-spinner");
  });

  it("applies default variant and size when not specified", () => {
    render(<Button label="Defaults" />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-primary");
    expect(button).toHaveClass("btn-md");
  });
});