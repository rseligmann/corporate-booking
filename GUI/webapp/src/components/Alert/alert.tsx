import React from 'react';
import './Alert.scss';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  title,
  icon,
  className = ''
}) => {
  const alertClasses = [
    'alert',
    `alert--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div role="alert" className={alertClasses}>
      {icon && <div className="alert__icon">{icon}</div>}
      <div className="alert__content">
        {title && <h5 className="alert__title">{title}</h5>}
        <div className="alert__description">{children}</div>
      </div>
    </div>
  );
};

export default Alert;