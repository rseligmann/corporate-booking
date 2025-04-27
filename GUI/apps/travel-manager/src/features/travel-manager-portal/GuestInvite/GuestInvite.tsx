import React, { useCallback, useEffect } from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { ActionIcon, Button, Card, Grid, Space, Text } from '@mantine/core'
import { useGuestInviteState, useFormData } from './hooks'
import { useAllGuestTypes, useCreateTrip } from '@corporate-travel-frontend/api/hooks'
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

  const createTripMutation = useCreateTrip();

  const { formData, clearFormData, updateGuestDetails, updateGuestTypeAndPreferences, updateItineraryDetails, updateTravelPreferences, updateEstimatedBudget } = useFormData();
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
      try{
        return getStepValidation(step, formData);
      }
      catch (error) {
        console.error("Validation error:", error);
        return false
      }
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
    createTripMutation.mutate(formData, {
      onSuccess: () => {
        alert('Invite sent successfully!');
        clearFormData();
        navigate('/dashboard');
      },
      onError: (error) => {
        console.error("Error sending invite:", error)
        alert(`Error sending invite. Please try again later. ${error}`)
      }
    })
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
                  onBudgetCalculated={updateEstimatedBudget}
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
              {currentStep <= totalSteps ? (
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
                  loading={createTripMutation.isPending}
                  disabled={createTripMutation.isPending}
                >
                   <span>{createTripMutation.isPending ? 'Sending...' : 'Send Invite'}</span>
                </Button>
              )}
            </div>
          </div>
      </TravelMgrPageLayout>
    );
  };
  
  export default GuestInvite;