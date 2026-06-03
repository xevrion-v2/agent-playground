export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

export type ButtonModel = Readonly<{
  type: "button";
  label: string;
  disabled: boolean;
}>;

/**
 * Creates the serializable button stub consumed by downstream packages.
 */
export function Button({ label, disabled = false }: Readonly<ButtonProps>): ButtonModel {
  return {
    type: "button",
    label,
    disabled
  };
}
