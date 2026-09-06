/**
 * Shared Button component.
 *
 * Previously returned a plain object `{ type: "button", label, disabled }`
 * which crashed in JSX context. Now returns a proper React element.
 */

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({ label, disabled = false }: ButtonProps) {
  // Use createElement for JSX-free React element creation
  // (the package may be consumed by both JSX and non-JSX consumers)
  const React = require("react");
  return React.createElement(
    "button",
    { type: "button", disabled },
    label,
  );
}
