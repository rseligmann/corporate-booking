import { useState } from 'react'
import { SelectGuestType, ManageGuestTypes, GuestTypePreferencesForm} from './components'
import { GuestTypePreferences } from '@/types'
import { getSampleTravelPreferencesData } from '../../../utils/getSampleTravelPreferencesData'
import styles from './BookingPreferences.module.scss';

const createDefaultGuestType = (name: string): GuestTypePreferences => ({
    id: Date.now(),
    guestType: name,
    flight: {
      cabinClass: 'economy',
      maxStops: 'any',
      refundableTicket: false
    },
    hotel: {
      minimumRating: 1
    },
    groundTransport: {
      preferredServices: 'uber'
    },
    dailyPerDiem: 0
  });

export const BookingPreferences =() => {
    const travelerPreferences = getSampleTravelPreferencesData();
  
  const [guestTypePreferences, setGuestTypePreferences] = useState<GuestTypePreferences[]>(travelerPreferences);
  const [selectedGuestType, setSelectedGuestType] = useState<string>(travelerPreferences[0].guestType);
  const [newGuestType, setNewGuestType] = useState('');
  const [error, setError] = useState<string | null>(null);
      
  const handleAddGuestType = () => {
    const trimmedName = newGuestType.trim();   
    if (!trimmedName) {
      setError('Guest type name cannot be empty');
      return;
    }
    if (guestTypePreferences.some(type => type.guestType.toLowerCase() === trimmedName.toLowerCase())) {
      setError('A guest type with this name already exists');
      return;
    }
    // Create new guest type with default values
    const newType = createDefaultGuestType(trimmedName);
    setGuestTypePreferences([...guestTypePreferences, newType]);
          
    // Reset form
    setNewGuestType('');
    setError(null);
    };
  
    const handleRemoveGuestType = (id: number) => {
      if (guestTypePreferences.length <= 1) {
        setError('Cannot remove the last guest type');
        return;
      }
      const updatedGuestTypes = guestTypePreferences.filter(type => type.id !== id);
      // If we're deleting the currently selected guest type,
      // update the selected guest type to the first available one
      if (selectedGuestType === id.toString()) {
      const firstAvailableId = updatedGuestTypes[0]?.id.toString();
      setSelectedGuestType(firstAvailableId);
      }
      setGuestTypePreferences(updatedGuestTypes);
    };

  return (
    <div>
        <div className={styles.content}>
          <ManageGuestTypes
            guestTypePreferences={guestTypePreferences}
            newGuestType={newGuestType}
            setNewGuestType={setNewGuestType}
            error={error}
            setError={setError}
            handleAddGuestType={handleAddGuestType}
            handleRemoveGuestType={handleRemoveGuestType}
          />

          <SelectGuestType 
            guestTypes={guestTypePreferences.map(t => t.guestType)}
            selectedGuestType={selectedGuestType}
            updateGuestTypeState={setSelectedGuestType} 
          />
          <GuestTypePreferencesForm 
            selectedGuestType={selectedGuestType}
            guestTypePreferences={guestTypePreferences}
            updateGuestTypePreferences={setGuestTypePreferences}
            updateGuestTypeState={setSelectedGuestType}
            />
        </div>
    </div>
  );
}