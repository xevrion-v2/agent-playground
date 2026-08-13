/**
 * Button Component Module
 * 
 * Provides a reusable Button component with comprehensive type safety
 * and customizable variants, sizes, and event handlers.
 * 
 * @module packages/ui
 */

/**
 * Available button visual variants.
 * - 'primary': Main call-to-action button
 * - 'secondary': Alternative action button
 * - 'outline': Bordered button with transparent background
 * - 'ghost': Minimal button with no border
 * - 'danger': Destructive action button
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

/**
 * Available button size options.
 * - 'sm': Small button for compact spaces
 * - 'md': Medium button (default)
 * - 'lg': Large button for prominent actions
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * The rendered result of a Button component.
 * Represents the virtual DOM element structure returned by Button.
 */
export type ButtonRenderResult = {
  /** The HTML element type */
  type: 'button';
  /** The button's display label */
  label: string;
  /** Whether the button is disabled */
  disabled: boolean;
  /** The visual variant of the button */
  variant: ButtonVariant;
  /** The size of the button */
  size: ButtonSize;
  /** Optional click handler */
  onClick?: () => void;
};

/**
 * Props for the Button component.
 * All props except 'label' are optional with sensible defaults.
 */
export type ButtonProps = {
  /** The text to display on the button */
  label: string;
  /** Whether the button is disabled (default: false) */
  disabled?: boolean;
  /** The visual variant of the button (default: 'primary') */
  variant?: ButtonVariant;
  /** The size of the button (default: 'md') */
  size?: ButtonSize;
  /** Optional click event handler */
  onClick?: () => void;
};

/**
 * Renders a Button component with the specified props.
 * 
 * @param {ButtonProps} props - The button configuration
 * @param {string} props.label - The text to display on the button
 * @param {boolean} [props.disabled=false] - Whether the button is disabled
 * @param {ButtonVariant} [props.variant='primary'] - The visual variant
 * @param {ButtonSize} [props.size='md'] - The button size
 * @param {Function} [props.onClick] - Click event handler
 * 
 * @returns {ButtonRenderResult} The rendered button element
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const button = Button({ label: 'Click me' });
 * 
 * // With all options
 * const dangerButton = Button({
 *   label: 'Delete',
 *   variant: 'danger',
 *   size: 'lg',
 *   disabled: false,
 *   onClick: () => console.log('clicked')
 * });
 * ```
 */
export function Button({ 
  label, 
  disabled = false, 
  variant = 'primary', 
  size = 'md',
  onClick 
}: ButtonProps): ButtonRenderResult {
  return {
    type: 'button',
    label,
    disabled,
    variant,
    size,
    onClick
  };
}
