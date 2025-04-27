import { Stepper } from '@mantine/core';

interface ProgressStepperProps {
    currentStep: number;
  }

export const ProgressStepper: React.FC<ProgressStepperProps> = ({currentStep}) =>{
    return(
        <Stepper active={currentStep} size="sm">
        <Stepper.Step label="Outbound"></Stepper.Step>
        <Stepper.Step label="Return"></Stepper.Step>
        <Stepper.Step label="Passenger Details"></Stepper.Step>
        <Stepper.Step label="Seats"></Stepper.Step>
        <Stepper.Step label="Confirmation"></Stepper.Step>
      </Stepper>
    )
}