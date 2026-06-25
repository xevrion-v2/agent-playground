/**
 * Shared UI package — Button stub.
 * Used by both `apps/web` and `apps/api` docs to demonstrate a reusable component.
 */

/** Props for the Button component. */
export type ButtonProps = {
  /** Display text rendered inside the button. */
  label: string;
  /** When true, renders the button in a disabled state. */
  disabled?: boolean;
};

/**
 * Render a button stub returning a plain-object description.
 * In a full app this would map to a DOM <button> or framework element.
 */
export function Button({ label, disabled = false }: ButtonProps): {
  type: "button";
  label: string;
  disabled: boolean;
} {
  return {
    type: "button",
    label,
    disabled
  };
}
