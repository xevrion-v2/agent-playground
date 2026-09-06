import { createElement } from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/**
 * [FIX #7] Button component now returns a proper React element
 * instead of a plain object literal.
 */
export function Button({ label, disabled = false }: ButtonProps) {
  return createElement(
    "button",
    { type: "button", disabled },
    label
  );
}
