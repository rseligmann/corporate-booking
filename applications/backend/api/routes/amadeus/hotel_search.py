from fastapi import APIRouter, Query, HTTPException, status
from typing import Annotated
import httpx
import asyncio
from api.models.amadeus.hotel_search import(
    HotelSearchResponse, HotelSearchRequest, MultiResponse, HotelOffersSearchRequest, 
    HotelAggregationResponse, HotelCustomSearchRequest
)
from api.dependencies import CurrentUserDependency, AmadeusConfigDependency
from core.external.amadeus import filter_flights_by_preference_criteria

router = APIRouter()

@router.get("/hotel-list", response_model=HotelSearchResponse)
async def get_hotel_list_by_geocode(
    amadeus: AmadeusConfigDependency,
    #current_user: CurrentUserDependency,
    request_query: Annotated[HotelSearchRequest, Query()]
):
    """
    Search for hotels using the Amadeus API. Does not provide pricing or availability
    
    This endpoint allows searching for hotels based on longitude, latitude, and various
    filtering options.
    """

    params = request_query.model_dump(exclude_none=True) 
    token = await amadeus.get_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{amadeus.api_url}/v1/reference-data/locations/hotels/by-geocode"
    timeout = httpx.Timeout(30.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            response_data=response.json()

            return HotelSearchResponse(**response_data)
    
    except httpx.HTTPStatusError as e:
        # Handle HTTP error responses (4XX, 5XX)
        error_detail = "Unknown error"
        try:
            error_data = e.response.json()
            if "errors" in error_data and len(error_data["errors"]) > 0:
                error = error_data["errors"][0]
                error_detail = f"Amadeus API error: {error.get('status')} - {error.get('title', 'Unknown')}: {error.get('detail', '')}"
                if "source" in error and "parameter" in error["source"]:
                    error_detail += f" (parameter: {error['source']['parameter']})"
            else:
                error_detail = f"Amadeus API error: {e.response.status_code}"
        except:
            error_detail = f"Amadeus API error: {e.response.status_code}"         
        raise HTTPException(
            status_code=e.response.status_code, 
            detail=error_detail
        )
    except httpx.RequestError as e:
        # Network-related errors
        raise HTTPException(
            status_code=503, 
            detail=f"Error communicating with Amadeus API: {str(e)} - {repr(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve Amadeus flight data: {str(e)}"
        )
    
@router.get("/hotel-offers", response_model=MultiResponse)
async def get_hotel_offers_by_hotelId(
    amadeus: AmadeusConfigDependency,
    #current_user: CurrentUserDependency,
    request_query: Annotated[HotelOffersSearchRequest, Query()]
):
    """
    Search for list hotel offers using the Amadeus API
    
    This endpoint allows searching for hotel offers based on a list of hotel IDs and various
    filtering options.
    """

    params = request_query.model_dump(exclude_none=True) 
    token = await amadeus.get_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{amadeus.api_url}/v3/shopping/hotel-offers"
    timeout = httpx.Timeout(30.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            response_data=response.json()

            return MultiResponse(**response_data)
    
    except httpx.HTTPStatusError as e:
        # Handle HTTP error responses (4XX, 5XX)
        error_detail = "Unknown error"
        try:
            error_data = e.response.json()
            if "errors" in error_data and len(error_data["errors"]) > 0:
                error = error_data["errors"][0]
                error_detail = f"Amadeus API error: {error.get('status')} - {error.get('title', 'Unknown')}: {error.get('detail', '')}"
                if "source" in error and "parameter" in error["source"]:
                    error_detail += f" (parameter: {error['source']['parameter']})"
            else:
                error_detail = f"Amadeus API error: {e.response.status_code}"
        except:
            error_detail = f"Amadeus API error: {e.response.status_code}"
        raise HTTPException(
            status_code=e.response.status_code, 
            detail=error_detail
        )
    except httpx.RequestError as e:
        # Network-related errors
        raise HTTPException(
            status_code=503, 
            detail=f"Error communicating with Amadeus API: {str(e)} - {repr(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve Amadeus flight data: {str(e)}"
        )
    
@router.get("/hotel-offers-avg-price", response_model=HotelAggregationResponse)
async def get_avg_hotel_price(
    amadeus: AmadeusConfigDependency,
    #current_user: CurrentUserDependency,
    request_query: Annotated[HotelCustomSearchRequest, Query()]
):
    """
    Search for list hotel offers using the Amadeus API
    
    This endpoint allows searching for hotel offers based on a list of hotel IDs and various
    filtering options.
    """
    hotel_list_request = HotelSearchRequest(
        latitude=request_query.latitude,
        longitude=request_query.longitude,
        radius= request_query.radius,
        ratings= request_query.ratings,
    )

    hotel_list = await get_hotel_list_by_geocode(amadeus=amadeus, request_query=hotel_list_request)
    
    hotel_Ids = []
    for hotel in hotel_list.data:
        hotel_Ids.append(hotel.hotelId)

    hotel_offer_request = HotelOffersSearchRequest(
        hotelIds=hotel_Ids[:50],
        checkInDate=request_query.checkInDate,
        checkOutDate=request_query.checkOutDate,
        includeClosed=True
    )
    hotel_offers_list = await get_hotel_offers_by_hotelId(amadeus=amadeus, request_query=hotel_offer_request)
    
    trip_length = (request_query.checkOutDate - request_query.checkInDate).days
    total_per_night_price_sum = 0
    total_price_sum = 0
    total_hotels = 0
    total_available_hotels = 0
    currency = 'USD'
    
    for hotel_offers in hotel_offers_list.data:
        total_hotels += 1
        if hotel_offers.available:
            total_available_hotels += 1
            trip_prices = [float(offers.price.total) for offers in hotel_offers.offers] # base plus taxes (no margins, markup, fees, or discounts)
            total_price_sum += min(trip_prices) if trip_prices else 0 # only take lowest priced offer
            total_per_night_price_sum += total_price_sum / (trip_length)
    
    overall_avg_price = round(total_price_sum / total_available_hotels, 2) if total_available_hotels > 0 else 0
    overall_avg_per_night_price = round(total_per_night_price_sum / total_available_hotels , 2) if total_available_hotels > 0 else 0

    return HotelAggregationResponse(
        total_hotels=total_hotels,
        total_available_hotels=total_available_hotels,
        overall_average_night_price=overall_avg_per_night_price,
        overall_average_total_price=overall_avg_price,
        currency=currency
    )


