import type { ReactElement } from "react";

export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export function Button({
  label,
  disabled = false
}: ButtonProps): ReactElement {
  return (
    <button type="button" disabled={disabled}>
      {label}
    </button>
  );
}
