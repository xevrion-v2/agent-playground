/**
 * Props for the shared Button component.
 *
 * @property label - The text label displayed on the button.
 * @property disabled - Whether the button is disabled and non-interactive.
 */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/**
 * The rendered output shape of a Button stub.
 * Returned by the {@link Button} function for consumers that need a
 * serializable representation of the button's visual state.
 */
export type ButtonRenderResult = {
  type: "button";
  label: string;
  disabled: boolean;
};

/**
 * Shared UI Button stub.
 *
 * Renders a serializable button descriptor from the given props.
 * The public shape of {@link ButtonProps} and the returned object
 * must remain stable for downstream consumers.
 *
 * @param props - The button configuration.
 * @param props.label - The text label for the button.
 * @param props.disabled - Whether the button is disabled. Defaults to `false`.
 * @returns A {@link ButtonRenderResult} descriptor for the button.
 */
export function Button({ label, disabled = false }: ButtonProps): ButtonRenderResult {
  return {
    type: "button",
    label,
    disabled
  };
}
