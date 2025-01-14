import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === currentStep 
                ? 'bg-blue-600 text-white' 
                : step < currentStep 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-gray-100 text-gray-400'
            }`}>
              {step < currentStep ? '✓' : step}
            </div>
            {step < totalSteps && (
              <div className={`w-24 h-1 mx-2 ${
                step < currentStep ? 'bg-green-100' : 'bg-gray-100'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1 text-sm text-gray-600">
        <span>Guest Details</span>
        <span>Itinerary</span>
        <span>Preferences</span>
        <span>Review</span>
      </div>
    </div>
  );
};