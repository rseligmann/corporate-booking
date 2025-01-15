import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from "lucide-react";
import './Checkbox.scss';

interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
  >((props, ref) => {
    const { className, ...otherProps } = props;

    return (
      <CheckboxPrimitive.Root
      ref={ref}
      className={`checkbox ${className}`}
      {...otherProps}
    >
      <CheckboxPrimitive.Indicator className="checkbox__indicator">
        <Check className="checkbox__check" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };