import api from '../api';
import { 
  CreateGuestType, CreateGuestTypeResponse, GuestTypesResponse,
  UpdateGuestType, 
} from '@/types/Trip/subtypes'; //replace existing guesttypepreferences with what we are using here. Also add guestpreferences to trip

export const GuestPreferencesService = {
  async getAllGuestTypes(company_id: string): Promise<GuestTypesResponse> {
    const response = await api.get<GuestTypesResponse>('/guest-types', {params: {company_id}});
    return response.data;
  },

  async getGuestTypePreferences(guest_type_id: string): Promise<CreateGuestTypeResponse> {
    const response = await api.get<CreateGuestTypeResponse>(`/guest-types/${guest_type_id}`);
    return response.data;
  },

  async createGuestType(guestTypeData: CreateGuestType): Promise<CreateGuestTypeResponse> {
    const response = await api.post<CreateGuestTypeResponse>('/guest-types', {
        name: guestTypeData.name,
        company_id: guestTypeData.company_id,
        user_id: guestTypeData.user_id
    });
    return response.data;
  },

  async updateGuestTypePreferences(
    guest_type_id: string, 
    preferences: UpdateGuestType
  ): Promise<CreateGuestTypeResponse> {
    const response = await api.put<CreateGuestTypeResponse>(
      `/guest-types/${guest_type_id}`, 
      preferences
    );
    return response.data;
  },

  async deleteGuestTypePreferences(guest_type_id: string): Promise<boolean> {
    const response = await api.delete<boolean>(`/guest-types/${guest_type_id}`);
    return response.data;
  }
};