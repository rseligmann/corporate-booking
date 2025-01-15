import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="progress-bar">
      <div className="progress-bar__steps">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="progress-bar__step-container">
            <div className={`progress-bar__step ${
              step === currentStep 
                ? 'progress-bar__step--current' 
                : step < currentStep 
                ? 'progress-bar__step--completed' 
                : 'progress-bar__step--upcoming'
            }`}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < totalSteps && (
              <div className={`progress-bar__connector ${
                step < currentStep ? 'progress-bar__connector--completed' : ''
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="progress-bar__labels">
        <span>Guest Details</span>
        <span>Itinerary</span>
        <span>Preferences</span>
        <span>Review</span>
      </div>
    </div>
  );
};