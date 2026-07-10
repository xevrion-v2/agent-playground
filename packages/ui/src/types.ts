/** Button component props */
export interface ButtonProps {
  /** The text displayed inside the button */
  label: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Called when the button is clicked */
  onClick?: () => void;
  /** Visual variant of the button */
  variant?: 'primary' | 'secondary' | 'danger';
  /** Size preset */
  size?: 'small' | 'medium' | 'large';
}
