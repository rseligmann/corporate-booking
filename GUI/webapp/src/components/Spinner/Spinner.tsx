import { FC } from 'react';
import './Spinner.scss';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div className="spinner__container">
      <div 
        className={`
          spinner 
          spinner--${size}
          ${className}
        `}
      />
    </div>
  );
};

export default Spinner;