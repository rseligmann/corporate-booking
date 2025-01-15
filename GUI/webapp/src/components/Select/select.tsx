import React, { useState, useRef, useEffect } from 'react';
import './Select.scss';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface SelectTriggerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  onClick?: () => void;
}

interface SelectValueProps {
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  'aria-selected'?: boolean;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  id,
  className = ''
}) => (
  <div id={id} className={`select__trigger ${className}`}>
    {children}
  </div>
);

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder,
  children,
  className = ''
}) => (
  <span className={`select__value ${!children ? 'select__value--placeholder' : ''} ${className}`}>
    {children || placeholder}
  </span>
);

export const SelectContent: React.FC<SelectContentProps> = ({
  children,
  className = ''
}) => (
  <div className={`select__content ${className}`}>
    {children}
  </div>
);

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  className = ''
}) => (
  <div
    className={`select__item ${className}`}
    data-value={value}
  >
    {children}
  </div>
);

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLDivElement>(null);

  //const selectClasses = [
  //  'select',
  // isOpen ? 'select--open' : '',
  //  error ? 'select--error' : '',
  //  disabled ? 'select--disabled' : '',
  //  className
  //].filter(Boolean).join(' ');

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTriggerClick = () => {
    setIsOpen(!isOpen);
  };
  
  const handleItemClick = (itemValue: string) => {
    setSelectedValue(itemValue);
    onValueChange?.(itemValue);
    setIsOpen(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === SelectTrigger) {
      return React.cloneElement(child as React.ReactElement<SelectTriggerProps>, {
        onClick: handleTriggerClick,
      });
    }

    if (child.type === SelectContent && isOpen) {
      const contentChildren = React.Children.map(child.props.children, (contentChild) => {
        if (!React.isValidElement(contentChild)) return contentChild;

        const typedContentChild = contentChild as React.ReactElement<SelectItemProps>;

        if (contentChild.type === SelectItem) {
          return React.cloneElement(typedContentChild, {
            onClick: () => handleItemClick(typedContentChild.props.value),
            'aria-selected': typedContentChild.props.value === selectedValue,
          });
        }

        return contentChild;
      });

      return React.cloneElement(child, {}, contentChildren);
    }

    return child;
  });

  return (
    <div ref={selectRef} className={`select ${className}`}>
      {childrenWithProps}
    </div>
  );
};