/**
 * Props for the shared Button component.
 *
 * @property label - The text displayed inside the button.
 * @property disabled - When `true`, the button cannot be interacted with.
 *                      Defaults to `false`.
 * @property variant - Visual variant of the button.
 *                     `"primary"` (default) | `"secondary"` | `"danger"`.
 * @property size - Controls padding and font-size.
 *                  `"sm"` | `"md"` (default) | `"lg"`.
 * @property onClick - Optional click handler invoked when the button is activated.
 */
export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
};

/**
 * Return type of the Button render function.
 * Describes the virtual-DOM–like object produced by the stub.
 */
export type ButtonRenderResult = {
  type: "button";
  label: string;
  disabled: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
};

/**
 * A shared, framework-agnostic Button stub.
 *
 * The component returns a plain object describing the button rather than
 * producing real DOM, making it portable across renderers.
 *
 * @param props - {@link ButtonProps}
 * @returns A render-result object describing the button.
 *
 * @example
 * ```ts
 * const btn = Button({ label: "Save" });
 * // => { type: "button", label: "Save", disabled: false, variant: "primary", size: "md" }
 * ```
 */
export function Button({
  label,
  disabled = false,
  variant = "primary",
  size = "md",
  onClick,
}: ButtonProps): ButtonRenderResult {
  return {
    type: "button",
    label,
    disabled,
    variant,
    size,
  };
}
