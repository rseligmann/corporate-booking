import { Stepper } from '@mantine/core';

interface ProgressStepperProps {
    currentStep: number;
    //totalSteps: number;
  }

export const ProgressStepper: React.FC<ProgressStepperProps> = ({currentStep}) =>{
    return(
        <Stepper active={currentStep} size="sm">
        <Stepper.Step label="Guest Details"></Stepper.Step>
        <Stepper.Step label="Itinerary"></Stepper.Step>
        <Stepper.Step label="Preferences"></Stepper.Step>
        <Stepper.Step label="Review"></Stepper.Step>
      </Stepper>
    )
}