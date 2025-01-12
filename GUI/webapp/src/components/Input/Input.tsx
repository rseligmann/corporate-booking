import { InputHTMLAttributes, forwardRef } from 'react';
import './Input.scss';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled';
  size?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      fullWidth = false,
      variant = 'outlined',
      size = 'md',
      ...props
    },
    ref
  ) => {
    const inputClasses = [
      'custom-input',
      `custom-input--${variant}`,
      `custom-input--${size}`,
      fullWidth ? 'custom-input--full-width' : '',
      error ? 'custom-input--error' : '',
      className
    ].filter(Boolean).join(' ');

    const labelClasses = [
      'custom-input__label',
      `custom-input__label--${size}`
    ].filter(Boolean).join(' ');

    const helperTextClasses = [
      'custom-input__helper-text',
      `custom-input__helper-text--${size}`,
      error ? 'custom-input__helper-text--error' : ''
    ].filter(Boolean).join(' ');

    return (
      <div className="custom-input-wrapper">
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {(error || helperText) && (
          <div className={helperTextClasses}>
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';