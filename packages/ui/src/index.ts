/**
 * Shared UI component types and stubs for the TaskFlow monorepo.
 *
 * @packageDocumentation
 */

/**
 * Properties accepted by the Button component.
 */
export type ButtonProps = {
  /** Visible text displayed inside the button. */
  label: string;
  /** When true, the button is rendered in a non-interactive state. */
  disabled?: boolean;
};

/**
 * Renders a button stub object.
 *
 * In a real implementation this would return a React element.
 * Currently returns a plain object describing the button state.
 *
 * @param props - Configuration for the button
 * @returns A plain button-descriptor object
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}
