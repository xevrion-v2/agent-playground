import React, { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The content to display inside the button
   */
  children: ReactNode;
  
  /**
   * The button variant style
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  
  /**
   * The button size
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Click handler function
   */
  onClick?: () => void;
}

const Button = ({ children, variant, size, onClick, ...props }: ButtonProps) => {
  return (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;