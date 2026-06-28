import { describe, it, expect } from "vitest";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}

function createButton(props: ButtonProps): string {
  const { label, variant = "primary", disabled = false } = props;
  const classes = variant === "primary" ? "btn-primary" : "btn-secondary";
  const disabledAttr = disabled ? " disabled" : "";
  return `<button class="${classes}"${disabledAttr}>${label}</button>`;
}

describe("createButton", () => {
  it("renders primary button by default", () => {
    const html = createButton({ label: "Submit" });
    expect(html).toContain("btn-primary");
    expect(html).toContain("Submit");
  });

  it("renders secondary variant", () => {
    const html = createButton({ label: "Cancel", variant: "secondary" });
    expect(html).toContain("btn-secondary");
  });

  it("adds disabled attribute when disabled", () => {
    const html = createButton({ label: "Wait", disabled: true });
    expect(html).toContain("disabled");
  });

  it("does not add disabled when not specified", () => {
    const html = createButton({ label: "Go" });
    expect(html).not.toContain("disabled");
  });
});
