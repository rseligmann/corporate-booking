import React from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import Button from '../../components/Button/button';
import { Card, CardContent } from "@/components/Card/card"
import { ProgressBar } from '../../features/guest-invite/ProgressBar/ProgressBar'
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState'
import { GuestDetailsForm } from '../../features/guest-invite/GuestDetailsForm/GuestDetailsForm'
import { ItineraryForm } from '../../features/guest-invite/ItineraryForm/ItineraryForm'
import { PreferencesForm } from '../../features/guest-invite/PreferencesForm/PreferencesForm'
import { ReviewForm } from '../../features/guest-invite/ReviewForm/ReviewForm'
//import { createGuestInvite } from '@/api/api'
import './GuestInvite.scss';

const GuestInvite: React.FC = () => {
  const { state, setCurrentStep } = useGuestInviteState();
  const navigate = useNavigate();
  const totalSteps = 4;

  const renderStepContent = () => {
    switch (state.currentStep) {
      case 1:
        return <GuestDetailsForm />;
      case 2:
        return <ItineraryForm />;
      case 3:
        return <PreferencesForm />;
      case 4:
        return <ReviewForm />;
      default:
        return null;
    }
  };

  //add logic to submit guest invite

  /*const handleSendInvite = async () => {
    try {
      await createGuestInvite(state)
      // Handle success (e.g., show a success message, redirect)
      alert('Invite sent successfully!'); //Example success handling
      navigate('/'); //Example redirect
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error sending invite:", error);
      alert('Error sending invite. Please try again later.'); //Example error handling

    }
  }*/

    return (
      <div className="guest-invite">
        <div className="guest-invite__container">
          <div className="guest-invite__header">
            <button 
              onClick={() => navigate('/')}
              className="back-button"
            >
              <ArrowLeft />
            </button>
            <h1 className="guest-invite__title">New Guest Invite</h1>
          </div>
  
          <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
          
          <Card>
            <CardContent className="guest-invite__content">
              {renderStepContent()}
            </CardContent>
          </Card>
  
          <div className="guest-invite__actions">
            {state.currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(state.currentStep - 1)}
              >
                Previous
              </Button>
            )}
            <div className="guest-invite__primary-action">
              {state.currentStep < totalSteps ? (
                <Button
                  variant="default"
                  onClick={() => setCurrentStep(state.currentStep + 1)}
                >
                  <span>Continue</span>
                  <ChevronRight className="guest-invite__action-icon" />
                </Button>
              ) : (
                <Button
                  variant="default"
                  //onClick={handleSendInvite}
                >
                  <span>Send Invite</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default GuestInvite;