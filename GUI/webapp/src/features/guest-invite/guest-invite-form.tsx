import React from 'react'
import { useNavigate}  from 'react-router-dom'
import { ChevronRight, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/Button/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProgressBar } from './ProgressBar'
import { useGuestInviteState } from '@/api/hooks/useGuestInviteState'
import { GuestDetailsForm } from './GuestDetailsForm'
import { ItineraryForm } from './ItineraryForm'
import { PreferencesForm } from './PreferencesForm'
import { ReviewForm } from './ReviewForm'
//import { createGuestInvite } from '@/api/api'

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-6">
          <button 
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">New Guest Invite</h1>
        </div>

        <ProgressBar currentStep={state.currentStep} totalSteps={totalSteps} />
        
        <Card>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        <div className="mt-8 flex justify-between">
          {state.currentStep > 1 && (
            <Button
              onClick={() => setCurrentStep(state.currentStep - 1)}
              variant="outline"
            >
              Previous
            </Button>
          )}
          <div className="ml-auto">
            {state.currentStep < totalSteps ? (
              <Button
                onClick={() => setCurrentStep(state.currentStep + 1)}
                className="bg-blue-600 text-white"
              >
                <span>Continue</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                
              // send guest invite on click
              //onClick={handleSendInvite}
               
              className="bg-blue-600 text-white"
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