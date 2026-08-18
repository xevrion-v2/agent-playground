/**
 * Shared UI package — component stubs used across the monorepo.
 * Currently provides a minimal Button component placeholder.
 */

/** Props accepted by the Button component.
 *
 * - `label`: Text displayed inside the button (required)
 * - `onClick`: Callback fired on click (required)
 * - `disabled`: When true, the button is non-interactive (optional, default false)
 */
export interface ButtonProps {
  /** The text rendered inside the button element. */
  label: string;
  /** Callback invoked when the user clicks the button. */
  onClick: () => void;
  /** Whether the button should be disabled and non-interactive. */
  disabled?: boolean;
}

/**
 * A minimal Button component stub.
 *
 * Expected final implementation should render a `<button>` element with:
 * - `disabled` attribute reflecting the `disabled` prop
 * - click handler wired to `onClick`
 * - accessible label from the `label` prop
 * - appropriate styling based on disabled state
 */
export function Button({ label, onClick, disabled = false }: ButtonProps) {
  // TODO: Return a proper React element
  // Example: return React.createElement('button', { onClick, disabled }, label);
  return { type: 'button', label, disabled };
}
