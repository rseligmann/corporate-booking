import { useEffect, useState, useCallback } from 'react';
import { Trip } from '@/types'
import { useGuestTypePreferences } from '@/api/hooks';

const initialFormData: Trip ={
  id: "",
  guest:{
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  guestType: "",
  status: "pending",
  travelPreferences: {
    id: "",
    guestType: "",
    flight: {
      cabinClass: "ECONOMY"
    },
    hotel: {},
    groundTransport: {},
    dailyPerDiem:0,
  },
  itinerary: {
    id: "",
    originCity: "",
    destinationCity: "",
    searchedAirports:{
      originAirports:[""],
      destinationAirports: [""],
    },
    startDate: new Date(),
    endDate: null,
  } ,
  created: new Date(),
  modified: new Date(),
  createdBy: "Rorey",
}
export const useFormData = () => {
   
  const [selectedGuestTypeId, setSelectedGuestType] = useState<string | null>(null);
  const {data: guestTypePreferences, isSuccess: guestTypePrefIsSuccess, isPending: guestTypePrefIsPending, error: apiErrorGuestPref } = useGuestTypePreferences(selectedGuestTypeId ?? '')
  
  //Set form data from localStorage or use initial data
    const [formData, setFormData] = useState<Trip>(()=>{
        const savedData=localStorage.getItem('guestInviteFormData');
        if (savedData) {
          const parsedData=JSON.parse(savedData);
          // Convert string dates back to Date objects
          return {
            ...parsedData,
            itinerary: {
              ...parsedData.itinerary,
              startDate: parsedData.itinerary.startDate ? new Date(parsedData.itinerary.startDate) : null,
              endDate: parsedData.itinerary.endDate ? new Date(parsedData.itinerary.endDate) : null,
            }
          };
        }
        return initialFormData;
    });

    //Save to localStorage whenever form data changes
    useEffect(()=>{
        localStorage.setItem('guestInviteFormData', JSON.stringify(formData));
    }, [formData]);

     // Effect to update form data when guestTypePreferences changes
    useEffect(() => {
      if (guestTypePreferences && guestTypePrefIsSuccess && selectedGuestTypeId) {
        setFormData(prevData => ({
          ...prevData,
          guestType: guestTypePreferences.guestType,
          travelPreferences: guestTypePreferences,
        }));
        console.log("Updated form data with preferences:", guestTypePreferences);
      }
    }, [guestTypePreferences, guestTypePrefIsSuccess, selectedGuestTypeId]);

    useEffect(() => {
      console.log("Form data after update:", formData);
    }, [formData]);

    //Cleanup function to clear form data from localStorage
      const clearFormData= useCallback(()=>{
        localStorage.removeItem('guestInviteFormData');
        localStorage.removeItem('guestInviteCurrentStep');
        setFormData(initialFormData);
      }, []);
    
    const updateGuestDetails = (details: Partial<Trip['guest']>) => {
        setFormData(prevData => ({
          ...prevData,
          guest: { ...prevData.guest, ...details },
        }));
      };
    
    const updateGuestTypeAndPreferences=(guestTypeId: string) =>{
        setSelectedGuestType(guestTypeId)
    }
    
    const updateItineraryDetails = (details: Partial<Trip['itinerary']>) => {
        setFormData(prevData => ({
          ...prevData,
          itinerary: { ...prevData.itinerary, ...details },
        }));
    };
    
    const updateTravelPreferences = (preferences: Partial<Trip['travelPreferences']>) => {
        setFormData(prevData => ({
          ...prevData,
          travelPreferences: { ...prevData.travelPreferences, ...preferences },
        }));
    };

    return {
        formData,
        clearFormData,
        updateGuestDetails,
        updateGuestTypeAndPreferences,
        updateItineraryDetails,
        updateTravelPreferences,
    }
}
