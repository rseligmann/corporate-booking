from fastapi import HTTPException
import json
import httpx
from typing import Dict, Optional
from datetime import datetime

class AmadeusConfig:
    def __init__(self, config_file_path: str):
        self.config = self._load_config(config_file_path)
        self.api_key = self.config.get('API_KEY')
        self.api_secret = self.config.get("API_SECRET")
        self.api_url = self.config.get("API_URL")

        self._token = None
        self._token_expiry = 0
    
    def _load_config(self, config_file: str) -> Dict:
        """Load API credentials from the key file"""
        try:
            with open(config_file) as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading config from {config_file}: {str(e)}")
            return {}
    
    async def get_token(self) -> str:
        """Get an OAuth token for Amadeus API, refreshing if necessary"""
        # Simple token caching logic
        import time
        current_time = time.time()
        
        if self._token and current_time < self._token_expiry:
            return self._token
        
        # Need to fetch a new token
        url = f"{self.api_url}/v1/security/oauth2/token"
        payload = {
            "grant_type": "client_credentials",
            "client_id": self.api_key,
            "client_secret": self.api_secret
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, data=payload)
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to obtain Amadeus token")
            result = response.json()
            self._token = result['access_token']
            self._token_expiry = current_time + result['expires_in'] - 120 # Buffer of 2 minutes
            return self._token
        
def filter_flights_by_preference_criteria(
        response_data: dict,
        arrival_start: Optional[str],
        arrival_end: Optional[str],
        return_start: Optional[str],
        return_end: Optional[str],
        max_stops: Optional[str]
) -> dict:
    """
    Filter flight offers based on arrival and departure time windows.
    
    Args:
        response_data: The original API response data
        arrival_start: Earliest acceptable arrival time
        arrival_end: Latest acceptable arrival time
        return_start: Earliest acceptable return departure time
        return_end: Latest acceptable return departure time
        max_stops: Maximum number of stops allowed
        
    Returns:
        Filtered response data
    """

    if not any([arrival_start, arrival_end, return_start, return_end]) and (not max_stops or max_stops == 'ANY'):
        return response_data
    
    filtered_offers = []

    max_stops_map = {
        'DIRECT': 0,
        'ONE_STOP': 1,
        'TWO_STOPS': 2
    }
    max_stops_allowed = max_stops_map.get(max_stops) if max_stops else None

    for offer in response_data.get("data",[]):
        is_valid = True

        if max_stops and max_stops != 'ANY':
            for itinerary in offer.get("itineraries",[]):
                #total_stops = sum(segment.get("numberOfStops", 0) for segment in itinerary.get("segments",[]))
                total_stops = len(itinerary.get("segments", [])) -1 if len(itinerary.get("segments", [])) > 1 else 0

                if total_stops > max_stops_allowed:
                    is_valid = False
                    break

        if is_valid and (arrival_start or arrival_end) and offer.get("itineraries") and len(offer["itineraries"]) >0:
            outbound = offer["itineraries"][0]
            if outbound.get("segments") and len(outbound["segments"])> 0:
                # Last segment contains arrival info at final destination
                last_segment = outbound["segments"][-1]
                arrival_datetime = datetime.fromisoformat(last_segment["arrival"]["at"])

                if arrival_start and arrival_datetime <= arrival_start:
                    is_valid = False
                if arrival_end and arrival_datetime >= arrival_end:
                    is_valid = False
        
        if is_valid and (return_start and return_end) and offer.get("itineraries") and len(offer["itineraries"]) >1:
            return_journey = offer["itineraries"][1]
            if return_journey.get("segments") and len(return_journey["segments"]) >0:
                # First segment contains departure info from destination
                first_segment = return_journey["segments"][0]
                departure_datetime = datetime.fromisoformat(first_segment["departure"]["at"])

                if return_start and departure_datetime <= return_start:
                    is_valid = False
                if return_end and departure_datetime >= return_end:
                    is_valid = False

        if is_valid:
            filtered_offers.append(offer)
    
    # Create a new response with the filtered offers
    filtered_response = response_data.copy()
    filtered_response["data"] = filtered_offers
    filtered_response["meta"]["count"] = len(filtered_offers)

    return filtered_response