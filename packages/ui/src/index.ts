/**
 * ButtonProps defines the public interface for the Button component.
 * Use these props to control the button's label, disabled state, and click handler.
 */
export type ButtonProps = {
  /** The visible text label rendered inside the button */
  label: string;
  /** Whether the button is disabled and non-interactive */
  disabled?: boolean;
  /** Optional click handler invoked when the button is activated */
  onClick?: () => void;
};

/**
 * Button creates a plain button descriptor object.
 * Returns a typed object representing the button's current state.
 */
export function Button({ label, disabled = false }: ButtonProps): { type: string; label: string; disabled: boolean } {
  return {
    type: "button",
    label,
    disabled
  };
}
