/** Properties for the Button component */
export type ButtonProps = {
  label: string;
  disabled?: boolean;
};

/** Result shape returned by Button() */
export type ButtonResult = {
  type: 'button';
  label: string;
  disabled: boolean;
};

/** Create a button configuration object */
export function Button({ label, disabled = false }: ButtonProps): ButtonResult {
  return {
    type: 'button',
    label,
    disabled
  };
}