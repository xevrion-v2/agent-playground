/** Represents the shape of props accepted by the Button component */
export type ButtonProps = {
  /** The text label displayed on the button */
  label: string;
  /** When true, the button is rendered in a disabled (non-interactive) state. Defaults to false. */
  disabled?: boolean;
  /** Optional variant to control the button's appearance */
  variant?: "primary" | "secondary" | "ghost";
  /** Optional size preset */
  size?: "sm" | "md" | "lg";
  /** Optional click handler */
  onClick?: () => void;
};

/** A minimal stub Button component that returns a plain object representation */
export function Button({ label, disabled = false }: ButtonProps) {
  return {
    type: "button",
    label,
    disabled
  };
}
