from fastapi import APIRouter, Query, HTTPException, status
import httpx
from api.models.weather import WeatherResponse

router = APIRouter()

@router.get("/", response_model=WeatherResponse)
async def get_weather(
    # open_meteo: OpenMeteoConfigDependency,
    #current_user: CurrentUserDependency,
    lat: float = Query(..., ge=-90, le=90),
    lng: float = Query(..., ge=-180, le=180)
):
    """
    Get 14 day weather forecase by latitude and longitude.

    Currently using free version of open-meteo.com
    """
    baseurl = f"https://api.open-meteo.com/v1/forecast?"
    location = f"latitude={lat}&longitude={lng}"
    output = f"&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=14"
    units = f"&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch"
    url = f"{baseurl}{location}{output}{units}"

    timeout = httpx.Timeout(30.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(url)
            response.raise_for_status()
            response_data=response.json()

            return WeatherResponse(**response_data)
    
    except httpx.HTTPStatusError as e:
        # Handle HTTP error responses (4XX, 5XX)
        error_detail = "Unknown error"
        try:
            error_data = e.response.json()
            if "errors" in error_data and len(error_data["errors"]) > 0:
                error = error_data["errors"][0]
                error_detail = f"Open-Meteo API error: {error.get('status')} - {error.get('title', 'Unknown')}: {error.get('detail', '')}"
                if "source" in error and "parameter" in error["source"]:
                    error_detail += f" (parameter: {error['source']['parameter']})"
            else:
                error_detail = f"Open-Meteo  API error: {e.response.status_code}"
        except:
            error_detail = f"Open-Meteo  API error: {e.response.status_code}"
            
        raise HTTPException(
            status_code=e.response.status_code, 
            detail=error_detail
        )
    except httpx.RequestError as e:
        # Network-related errors
        raise HTTPException(
            status_code=503, 
            detail=f"Error communicating with Open-Meteo  API: {str(e)} - {repr(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve Open-Meteo  weather data: {str(e)}"
        )