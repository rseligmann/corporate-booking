import { useState, useEffect } from 'react'
import { SelectGuestType, ManageGuestTypes, GuestTypePreferencesForm} from './components'
import { useAuth } from '@/contexts/AuthContext'
import { useAllGuestTypes, useCreateGuestType, useGuestTypePreferences, useDeleteGuestType } from '@corporate-travel-frontend/api/hooks/useGuestPreferences'
import styles from './BookingPreferences.module.scss';

interface GuestTypeSelection {
  guest_type_id: string;
  name: string;
}

export const BookingPreferences =() => {
  
  // get auth details
  const { authState } = useAuth();
  const companyId = authState.user?.company_id || '';
  const userId = authState.user?.user_id || "";

  const {data: allGuestTypes, isSuccess, isPending, error: apiError} = useAllGuestTypes(companyId)
  const createGuestTypeMutation = useCreateGuestType();
  const deleteGuestTypeMutation = useDeleteGuestType();

  const [selectedGuestType, setSelectedGuestType] = useState<GuestTypeSelection | null>(null);
  const {data: guestTypePreferences, isSuccess: guestTypePrefIsSuccess, isPending: guestTypePrefIsPending, error: apiErrorGuestPref} = useGuestTypePreferences(selectedGuestType?.guest_type_id ?? '')


  const [newGuestType, setNewGuestType] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Set first guest type as selected when data is loaded initially
  useEffect(() => {
    if (isSuccess && allGuestTypes && allGuestTypes.length > 0 && !selectedGuestType) {
      setSelectedGuestType({
        guest_type_id: allGuestTypes[0].guest_type_id,
        name: allGuestTypes[0].name
      });
    }
  }, [isSuccess, allGuestTypes, selectedGuestType]);

  // Reset selected guest type if the current one is deleted
  useEffect(() => {
    if (selectedGuestType && allGuestTypes && !allGuestTypes.some(type => type.guest_type_id === selectedGuestType.guest_type_id)) {
      if (allGuestTypes.length > 0) {
        setSelectedGuestType({
          guest_type_id: allGuestTypes[0].guest_type_id,
          name: allGuestTypes[0].name
        });
      } else {
        setSelectedGuestType(null);
      }
    }
  }, [allGuestTypes, selectedGuestType, deleteGuestTypeMutation.isSuccess]);

  const handleAddGuestType = () => {
    const trimmedName = newGuestType.trim();   
    if (!trimmedName) {
      setError('Guest type name cannot be empty');
      return;
    }
    if (allGuestTypes?.some(type => type.name.toLowerCase() === trimmedName.toLowerCase())) {
      setError('A guest type with this name already exists');
      return;
    }

    // Create new guest type with default values
    createGuestTypeMutation.mutate({
      name: trimmedName,
      company_id: companyId,
      user_id: userId
    })    
    // Reset form
    setNewGuestType('');
    setError(null);
    };


  
    const handleRemoveGuestType = (id: string) => {
      if (allGuestTypes && allGuestTypes.length <= 1) {
        setError('Cannot remove the last guest type');
        return;
      }

      deleteGuestTypeMutation.mutate(id)
      //const updatedGuestTypes = guestTypePreferences.filter(type => type.id !== id);

      // If we're deleting the currently selected guest type,
      // update the selected guest type to the first available one
      // if (selectedGuestType?.guest_type_id === id.toString()) {
      //   const firstAvailableId = updatedGuestTypes[0]?.id.toString();
      //   setSelectedGuestType(null);
      // }
      //setGuestTypePreferences(updatedGuestTypes);
    };

  return (
    <div>
        <div className={styles.content}>
          <ManageGuestTypes
            guestTypes={allGuestTypes}
            newGuestType={newGuestType}
            setNewGuestType={setNewGuestType}
            error={error || (createGuestTypeMutation.isError ? String(createGuestTypeMutation.error) : null)}
            setError={setError}
            handleAddGuestType={handleAddGuestType}
            handleRemoveGuestType={handleRemoveGuestType}
            isCreating={createGuestTypeMutation.isPending}
            isDeleting={deleteGuestTypeMutation.isPending}
          />


              <SelectGuestType
                guestTypes={allGuestTypes}
                selectedGuestType={selectedGuestType}
                updateGuestTypeState={setSelectedGuestType}
                isPending={isPending}
                apiError={apiError}
                isSuccess={isSuccess}
              />

          <GuestTypePreferencesForm 
            guestTypePreferences={guestTypePreferences}
            selectedGuestType={selectedGuestType}
            isSuccess={guestTypePrefIsSuccess}
            isPending={guestTypePrefIsPending}
            apiError={apiErrorGuestPref}
          /> 
        </div>
    </div>
  );
}