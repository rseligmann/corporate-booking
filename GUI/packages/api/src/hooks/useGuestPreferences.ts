import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { GuestPreferencesService } from '../services/guestPreferencesServices';
import { CreateGuestType, UpdateGuestType } from '@/types/Trip/subtypes';

// Fetch all guest types
export const useAllGuestTypes = (company_id: string) => {
  return useQuery({
    queryKey: ['guestTypes', company_id],
    queryFn: () => GuestPreferencesService.getAllGuestTypes(company_id),
  });
};

// Fetch a specific guest type preferences by guest type id
export const useGuestTypePreferences = (guest_type_id: string) => {
  return useQuery({
    queryKey: ['guestType', guest_type_id],
    queryFn: () => GuestPreferencesService.getGuestTypePreferences(guest_type_id),
    enabled: !!guest_type_id, //what does this do?
  });
};

// Create a new guest type
export const useCreateGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (guestTypeData: CreateGuestType) => 
      GuestPreferencesService.createGuestType(guestTypeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
    }
  });
};

// Update an existing guest type
export const useUpdateGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      guest_type_id, 
      updateData 
    }: { 
      guest_type_id: string; 
      updateData: UpdateGuestType
    }) => 
      GuestPreferencesService.updateGuestTypePreferences(guest_type_id, updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
      queryClient.invalidateQueries({ queryKey: ['guestType', data.id] });
    }
  });
};

// Delete a guest type
export const useDeleteGuestType = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (guest_type_id: string) => 
      GuestPreferencesService.deleteGuestTypePreferences(guest_type_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guestTypes'] });
    }
  });
};