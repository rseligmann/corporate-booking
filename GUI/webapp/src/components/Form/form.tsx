import { FormEvent, forwardRef } from 'react';
import { Input, Text, Button } from '@/components';
import './Form.scss';

export type FormSize = 'sm' | 'md' | 'lg';
export type FormVariant = 'outlined' | 'filled';

export interface FormField {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  value?: string;
  error?: string;
}

export interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  size?: FormSize;
  variant?: FormVariant;
  className?: string;
  submitText?: string;
  title?: string;
  description?: string;
  error?: string;
  isLoading?: boolean;
  submitButtonVariant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      fields,
      onSubmit,
      size = 'md',
      variant = 'outlined',
      className = '',
      submitText = 'Submit',
      title,
      description,
      error,
      isLoading = false,
      submitButtonVariant = 'primary',
      ...props
    },
    ref
  ) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries()) as Record<string, string>;
      onSubmit(data);
    };

    const formClasses = [
      'custom-form',
      `custom-form--${variant}`,
      `custom-form--${size}`,
      className
    ].filter(Boolean).join(' ');

    return (
      <form ref={ref} className={formClasses} onSubmit={handleSubmit} {...props}>
        {title && (
          <Text
            size="xl"
            weight="semibold"
            className="custom-form__title"
          >
            {title}
          </Text>
        )}
        
        {description && (
          <Text
            size="sm"
            className="custom-form__description"
            color="gray"
          >
            {description}
          </Text>
        )}

        <div className="custom-form__fields">
          {fields.map((field) => (
            <Input
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              helperText={field.helperText}
              error={field.error}
              required={field.required}
              value={field.value}
              size={size}
              variant={variant}
              fullWidth
            />
          ))}
        </div>

        {error && (
          <Text
            size="sm"
            className="custom-form__error"
            color="red"
          >
            {error}
          </Text>
        )}

        <Button
          type="submit"
          isLoading={isLoading}
          size={size}
          variant={submitButtonVariant}
          fullWidth
        >
          {submitText}
        </Button>
      </form>
    );
  }
);

Form.displayName = 'Form';