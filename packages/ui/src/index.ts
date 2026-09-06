/**
 * Shared UI components for TaskFlow.
 *
 * The Button stub is intentionally minimal: it is a typed descriptor rather
 * than a real React component. Consumers (apps/web, future apps/*) import
 * `Button` and `ButtonProps` to compose UI without pulling in a heavy
 * component library.
 */

/**
 * The literal HTML button type emitted by {@link Button}.
 *
 * Kept as a single-member string-literal union so the `type` field cannot
 * drift away from the value `"button"` at the type level.
 */
export type ButtonVariant = "button";

/**
 * The serialized shape returned by {@link Button}.
 *
 * Marked `readonly` to communicate that callers must treat the descriptor
 * as immutable. Adding a new field is a breaking change.
 */
export interface ButtonResult {
  readonly type: ButtonVariant;
  readonly label: string;
  readonly disabled: boolean;
}

/**
 * Props accepted by {@link Button}.
 *
 * `label` is required; `disabled` is optional and defaults to `false`.
 * The shape is `readonly` so downstream consumers cannot mutate props in
 * place — this catches accidental aliasing bugs at compile time.
 */
export interface ButtonProps {
  readonly label: string;
  readonly disabled?: boolean;
}

/**
 * Build an immutable Button descriptor.
 *
 * The returned object always carries `type: "button"` and a `disabled`
 * boolean (defaulting to `false`), regardless of whether the caller passed
 * `disabled` explicitly.
 *
 * @param props - Button props. See {@link ButtonProps}.
 * @returns A {@link ButtonResult} describing the button.
 */
export function Button({
  label,
  disabled = false,
}: ButtonProps): ButtonResult {
  return {
    type: "button",
    label,
    disabled,
  };
}
