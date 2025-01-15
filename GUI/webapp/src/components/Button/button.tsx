import React from 'react';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'icon' | 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  asChild?: boolean; // Added this, but we'll handle it differently
  href?: string; // Add this to support link functionality
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  href,
  onClick,
  asChild,
  ...props
}) => {
  const buttonClasses = [
    'button',
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? 'button--full-width' : '',
    className
  ].filter(Boolean).join(' ');

  // If it's being used as a link
  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;