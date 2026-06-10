import * as React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  [key: string]: any;
}

function Button(props: ButtonProps) {
  const { 
    children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  onClick, 
  type, 
  disabled,
  ...rest 
} = props;

  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;