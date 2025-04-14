import { useState, useEffect } from 'react'
import { Loader, Select } from '@mantine/core';
import { useCitySearch, useDebounce } from '@/api/hooks';
import { SearchCityResponse, Trip } from '@/types';

interface CitySelectProps {
    label: string
    placeholder: string
    itineraryField: string
    updateItineraryDetails: (update: Partial<Trip['itinerary']>) => void;
    setSelectedCity: (city: SearchCityResponse) => void;
    getErrorMessage: (message: string) => string | undefined;
}

export const CitySelect: React.FC<CitySelectProps> = ({label, placeholder, itineraryField, updateItineraryDetails, setSelectedCity, getErrorMessage}) => {

    // city SEARCH value and debounced version
    const [citySearch, setCitySearch] = useState<string>('')
    // Debounced verison of origin search value
    const debouncedCitySearch = useDebounce(citySearch, 200)
    // API to search city
    const { data: cityData, isPending: cityDataIsPending, error: cityDataError } = useCitySearch(debouncedCitySearch, 5, .3, debouncedCitySearch.length >=1)
    // API response of list of returned city objects
    const [cityResponseObjects, setCityResponseObjects] = useState<SearchCityResponse[]>([])
    // API response of list of "city, state_id". Needed to prevent drop down interuptions
    const [displayCityData, setDisplayCityData] = useState<string[]>([])

    // Everytime we get new data, update the response object. This prevents "no results" during debouncing
    useEffect (() =>{
    if (cityData && !cityDataIsPending) {
        setDisplayCityData(cityData.map((city) => `${city.city}, ${city.state_id}`));
        setCityResponseObjects(cityData);
    }
    }, [cityData, cityDataIsPending])

    const handleSearch= (value: string) => {
        const selectedCityIndex = displayCityData.findIndex(item => item === value)
        if (selectedCityIndex !== -1){
            setSelectedCity(cityResponseObjects[selectedCityIndex])
        }
        setCitySearch(value)
        updateItineraryDetails({ [itineraryField]: value} as Partial<Trip['itinerary']>)
    }

    return(
        <Select
            label={label}
            required
            withAsterisk
            searchValue={citySearch}
            onSearchChange={(value) => handleSearch(value)}
            placeholder={placeholder}
            error={cityDataError?.message || getErrorMessage(itineraryField)}
            data={displayCityData}
            rightSection={cityDataIsPending && citySearch ? <Loader size={16} /> : null}
            searchable
            nothingFoundMessage={citySearch.length > 0 && !cityDataIsPending && displayCityData.length ===0 ? "City not found..." : null}
        />
    )
}