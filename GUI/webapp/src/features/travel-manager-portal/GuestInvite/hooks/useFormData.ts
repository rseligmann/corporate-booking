import { useEffect, useState, useCallback } from 'react';
import { Trip } from '@/types'
import { getSampleTravelPreferencesData } from '../../utils/getSampleTravelPreferencesData';

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
    guestType: "",
    flight: {
      cabinClass: "any"
    },
    hotel: {},
    groundTransport: {},
    dailyPerDiem:0,
    id: "",
  },
  itinerary: {
    id: "",
    origin: "",
    destination: "",
    startDate: new Date(),
    endDate: null,
  } ,
  created: new Date(),
  modified: new Date(),
  createdBy: "Rorey",
}
export const useFormData = () => {
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
    
    const updateGuestTypeAndPreferences=(guestType: string) =>{
        const allPreferences = getSampleTravelPreferencesData();
        const matchingPreferences = allPreferences.find(p => p.guestType === guestType);
        if (matchingPreferences) {
          setFormData(prevData => ({
            ...prevData,
            guestType: guestType,
            travelPreferences: matchingPreferences,
          }));
        }else{
          console.log("No matching preferences found for guest type: ", guestType);
        }
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
