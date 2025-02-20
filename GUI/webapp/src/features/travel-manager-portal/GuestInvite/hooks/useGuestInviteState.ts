import { useState, useEffect, useCallback, ReactElement } from 'react';

export const useGuestInviteState = (steps: ReactElement[]) => {

  const [currentStep, setCurrentStep]= useState<number>(()=>{
    const savedStep=localStorage.getItem('guestInviteCurrentStep');
    return savedStep ? parseInt(savedStep) : 0;
  });

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }

  //Save current step to localStorage
  useEffect(()=>{
    localStorage.setItem('guestInviteCurrentStep', currentStep.toString());
  }, [currentStep]);

  //Cleanup function to clear form data from localStorage
  const clearCurrentStep= useCallback(()=>{
    localStorage.removeItem('guestInviteCurrentStep');
    setCurrentStep(0);
  }, []);

  return {
    currentStep,
    setCurrentStep,
    step: steps[currentStep],
    nextStep,
    prevStep,
    clearCurrentStep,
  };
};