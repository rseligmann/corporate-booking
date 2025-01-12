import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './Button.scss';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    isLoading ? `${baseClass}--loading` : '',
    fullWidth ? `${baseClass}--full-width` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      className={classes}
      disabled={isLoading || isDisabled}
    >
      {isLoading && (
        <span className="btn__spinner">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
            <circle
              className="btn__spinner-circle"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="3"
            />
          </svg>
        </span>
      )}
      
      <span className={`btn__content ${isLoading ? 'btn__content--loading' : ''}`}>
        {leftIcon && <span className="btn__icon btn__icon--left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="btn__icon btn__icon--right">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;