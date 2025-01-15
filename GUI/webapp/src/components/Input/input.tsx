import React from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  error = false,
  helperText,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'input',
    error ? 'input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <input className={inputClasses} {...props} />
      {helperText && (
        <p className={`input__helper-text ${error ? 'input__helper-text--error' : ''}`}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;