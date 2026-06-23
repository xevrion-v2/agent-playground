export type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
