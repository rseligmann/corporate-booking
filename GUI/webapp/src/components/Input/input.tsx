import React from 'react';
import { cn } from '@/lib/utils';
import './Input.scss';

// Define our custom size type
export type InputSize = 'sm' | 'default' | 'lg';

// Omit the native 'size' property and define our own props
export interface InputProps 
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  size?: InputSize;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className,
    label,
    error,
    size = 'default',
    fullWidth = false,
    type = 'text',
    ...props
  }, ref) => {
    const inputClasses = cn(
      'input',
      size !== 'default' && `input--${size}`,
      error && 'input--error',
      fullWidth && 'w-full',
      className
    );

    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label">
            {label}
          </label>
        )}
        <input
          type={type}
          className={inputClasses}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="input-error">{error}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';