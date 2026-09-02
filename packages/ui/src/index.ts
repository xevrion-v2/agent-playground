/**
 * Shared UI primitives for the TaskFlow apps.
 */

/** Props accepted by the {@link Button} component. */
export type ButtonProps = {
  /** Visible text rendered inside the button. */
  label: string;
  /** When true the button is non-interactive. Defaults to `false`. */
  disabled?: boolean;
};

/**
 * Minimal button stub. Returns a plain descriptor object so it can be
 * rendered by any UI layer (web, CLI, tests) without coupling to a framework.
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
} {
  return {
    type: "button",
    label,
    disabled,
  };
}
