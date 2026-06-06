/**
 * Shared UI component library for TaskFlow.
 * Exports stub components for early prototyping.
 */

/** Props accepted by the Button component. */
export interface ButtonProps {
  /** Visible text on the button. */
  label: string;
  /** When true, the button is grayed out and non-interactive. */
  disabled?: boolean;
  /** Click handler — stub only, no DOM event is fired. */
  onClick?: () => void;
  /** Visual variant: primary, secondary, or danger. */
  variant?: "primary" | "secondary" | "danger";
  /** Size preset: sm, md, or lg. */
  size?: "sm" | "md" | "lg";
}

/** Rendered button shape (stub — no actual DOM output). */
export interface ButtonRender {
  type: "button";
  label: string;
  disabled: boolean;
  variant: string;
  size: string;
}

/**
 * Create a button render descriptor.
 *
 * @example
 * const btn = Button({ label: "Save", variant: "primary" });
 */
export function Button({
  label,
  disabled = false,
  onClick: _onClick,
  variant = "primary",
  size = "md",
}: ButtonProps): ButtonRender {
  return { type: "button", label, disabled, variant, size };
}
