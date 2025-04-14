import React, { useCallback, useEffect } from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { ActionIcon, Button, Card, Grid, Space, Text } from '@mantine/core'
import { useGuestInviteState, useFormData } from './hooks'
import { useAllGuestTypes } from '@/api/hooks'
import { useAuth } from '@/contexts/AuthContext'
import { getStepValidation } from './utils/formValidation'
import { TravelMgrPageLayout } from '@/layouts';
import { EstimatedBudget, GuestDetailsForm, ItineraryForm, PreferencesForm, ProgressStepper, ReviewForm } from './components'
//import { createGuestInvite } from '@/api/api'
import './GuestInvite.scss';

const GuestInvite: React.FC = () => {
  
  const {authState} = useAuth();
  const companyId = authState.user?.company_id || '';
  const {data: allGuestTypesData, isPending: allGuestTypesIsPending, error: allGuestTypesError} = useAllGuestTypes(companyId)

  const { formData, clearFormData, updateGuestDetails, updateGuestTypeAndPreferences, updateItineraryDetails, updateTravelPreferences } = useFormData();
  const { currentStep, nextStep, prevStep, step, clearCurrentStep } = useGuestInviteState([
      <GuestDetailsForm 
        guestTypeData = {allGuestTypesData}
        guestData={formData.guest}
        updateGuestDetails={updateGuestDetails} 
        updateGuestTypeAndPreferences = {updateGuestTypeAndPreferences}
        isGuestTypeDataPending = {allGuestTypesIsPending}
        isGuestTypeDataError = {allGuestTypesError}
        />, 
      <ItineraryForm
        itineraryData={formData.itinerary}
        updateItineraryDetails={updateItineraryDetails}
      />, 
      <PreferencesForm
        preferencesData={formData.travelPreferences}
        updateTravelPreferences={updateTravelPreferences}
      />, 
      <ReviewForm
        formData={formData}
      />
  ]);

  const canProceed = useCallback((step: number): boolean => {
      return getStepValidation(step, formData);
    }, [formData]);

  const navigate = useNavigate();
  const totalSteps = 4;

  // Clear form data when component unmounts
  useEffect(() => {
    return () => {
      clearFormData();
      clearCurrentStep();
    };
  }, [clearFormData, clearCurrentStep]);

  //add logic to submit guest invite
  const handleSendInvite = async () => {
    try {
      //await createGuestInvite(state)
      // Handle success (e.g., show a success message, redirect)
      alert('Invite sent successfully!');
      clearFormData(); // Clear form data after successful submission
      navigate('/dashboard'); // Redirect to dashboard after successful submission
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending invite:", error);
      alert('Error sending invite. Please try again later.'); //Example error handling
    }
  }

  const handleBackToDashboard = () => {
    clearFormData();
    navigate('/dashboard');
  };

    return (
      <TravelMgrPageLayout
        title="New Guest Invite"
        subtitle="Create and send travel invites to your guests"
      >
          <div className="guest-invite__header">
            <ActionIcon
              onClick={handleBackToDashboard}
              variant="subtle" 
              color="gray" 
              size="sm"
            >
              <ArrowLeft />
            </ActionIcon>
            <Text fw={500}>Back to Dashboard</Text>
          </div>
  
          {/*<ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />*/}
          <ProgressStepper currentStep={currentStep} />
          <Space h="xl" />
          <Grid>
            <Grid.Col span="auto">
              <Card shadow ="xs" padding="lg" radius="md" withBorder>
                  {step}
              </Card>
            </Grid.Col>

            {currentStep > 0
            ? 
              <Grid.Col span={{base: 12, lg: 4}}>
                <EstimatedBudget
                  formData={formData}
                />
              </Grid.Col>
            : <></>
            }
          </Grid>
          <div className="guest-invite__actions">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
              >
                Previous
              </Button>
            )}
            <div className="guest-invite__primary-action">
              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  rightSection={<ChevronRight size={14}/>}
                  disabled={!canProceed(currentStep)}
                  //title={!canProceed(currentStep) ? 'Please fill out all required fields' : ""}
                >
                  <span>Continue</span>
                </Button>
              ) : (
                <Button
                  onClick={handleSendInvite}
                >
                  <span>Send Invite</span>
                </Button>
              )}
            </div>
          </div>
      </TravelMgrPageLayout>
    );
  };
  
  export default GuestInvite;