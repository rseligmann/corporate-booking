import { HotelPreferences } from "@/types/GuestTypePreferences/subtypes/HotelPreferences";

export const getHotelRating = () => {

    type HotelRating = NonNullable<HotelPreferences['minimumRating']>;
    
    const hotelRatings: HotelRating[] = [1, 2, 3, 4, 5];
    
    return hotelRatings.map(hotelRating => ({
      value: hotelRating.toString(),
      label: `${'⭐'.repeat(hotelRating)} ${hotelRating}+ Rating`
    }));
};