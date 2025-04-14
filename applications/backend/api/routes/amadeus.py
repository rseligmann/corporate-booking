from fastapi import APIRouter, Query, HTTPException, status
from typing import Annotated
import httpx
import asyncio
from api.models.amadeus import FlightOffersResponse, FlightOffersRequest, FlightAggregationResponse, AirportPairStatistics, FlightAggregationRequest
from api.dependencies import CurrentUserDependency, AmadeusConfigDependency
from core.external.amadeus import filter_flights_by_preference_criteria

router = APIRouter()

@router.get("/flight-offers", response_model=FlightOffersResponse)
async def get_flight_offers(
    amadeus: AmadeusConfigDependency,
    #current_user: CurrentUserDependency,
    request_query: Annotated[FlightOffersRequest, Query()]
):
    """
    Search for flight offers using the Amadeus API.
    
    This endpoint allows searching for flight offers based on origin, destination, dates and various
    filtering options.
    """

    # Extract time window parameters but don't send them to Amadeus API
    arrival_start = request_query.arrival_time_window_start
    arrival_end = request_query.arrival_time_window_end
    return_start = request_query.return_departure_time_window_start
    return_end = request_query.return_departure_time_window_end
    max_stops = request_query.max_stops

    params = request_query.model_dump(exclude={
        'arrival_time_window_start', 
        'arrival_time_window_end',
        'return_departure_time_window_start',
        'return_departure_time_window_end',
        'max_stops'
    },exclude_none=True)

    if max_stops == 'DIRECT':
        params['nonStop'] = True
    
    token = await amadeus.get_token()
    headers = {"Authorization": f"Bearer {token}"}
    url = f"{amadeus.api_url}/v2/shopping/flight-offers"

    timeout = httpx.Timeout(30.0, connect=10.0)

    try:
        async with httpx.AsyncClient(timeout=timeout) as client:
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            response_data=response.json()

            # If time window filtering is requested, apply it to the response data
            if any([arrival_start, arrival_end, return_start, return_end]) or (max_stops and max_stops != 'ANY'):
                response_data = filter_flights_by_preference_criteria(
                    response_data,
                    arrival_start,
                    arrival_end, 
                    return_start,
                    return_end,
                    max_stops
                )

            return FlightOffersResponse(**response_data)
    
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




async def multi_get_flight_offers(
        sleep_time, 
        amadeus: AmadeusConfigDependency,
        request_query: FlightOffersRequest):
    await asyncio.sleep(sleep_time)
    return await get_flight_offers(amadeus=amadeus, request_query=request_query)

@router.get("/flight-offers-avg-price", response_model=FlightAggregationResponse)
async def get_avg_flight_price(
    amadeus: AmadeusConfigDependency,
    #current_user: CurrentUserDependency,
    request_query: Annotated[FlightAggregationRequest, Query()]
):
    """
    Aggregate flight data across multiple origin and destination pairs.
    
    This endpoint searches for flights between each combination of origins and destinations,
    then returns statistics including flight counts, average prices, and overall totals.
    """

    tasks = []
    counter = 0
    async with asyncio.TaskGroup() as tg:
        for origin in request_query.originLocationCodes:
            for destination in request_query.destinationLocationCodes:
                if origin == destination:
                    continue

                flight_request = FlightOffersRequest(
                    originLocationCode=origin,
                    destinationLocationCode=destination,
                    departureDate=request_query.departureDate,
                    returnDate=request_query.returnDate,
                    adults=request_query.adults,
                    children=request_query.children,
                    infants=request_query.infants,
                    travelClass=request_query.travelClass,
                    includedAirlineCodes=request_query.includedAirlineCodes,
                    excludedAirlineCodes=request_query.excludedAirlineCodes,
                    nonStop=request_query.nonStop,
                    currencyCode=request_query.currencyCode,
                    maxPrice=request_query.maxPrice,
                    max=request_query.max,
                    arrival_time_window_start = request_query.arrival_time_window_start,
                    arrival_time_window_end = request_query.arrival_time_window_end,
                    return_departure_time_window_start = request_query.return_departure_time_window_start,
                    return_departure_time_window_end = request_query.return_departure_time_window_end,
                    max_stops = request_query.max_stops
                )
                task = tg.create_task(multi_get_flight_offers(counter,amadeus=amadeus, request_query=flight_request ))
                tasks.append(task)
                counter += .10

    results = [task.result() for task in tasks]

    pair_statistics = []
    total_flights = 0
    total_price_sum = 0
    currency = 'USD'

    for i, result in enumerate(results):
        origin_index = i // len(request_query.destinationLocationCodes)
        destination_index = i % len(request_query.destinationLocationCodes)
        origin = request_query.originLocationCodes[origin_index]
        destination = request_query.destinationLocationCodes[destination_index]
        flight_count = len(result.data)

        if flight_count >0:
            # if currency is None and flight_count > 0:
            #     currency = result.data[0].price.currency

            prices = [float(flight.price.grandTotal or flight.price.total) for flight in result.data]
            avg_price = sum(prices) / flight_count if flight_count > 0 else 0
            min_price = min(prices) if prices else 0
            max_price = max(prices) if prices else 0
            total_flights += flight_count
            total_price_sum += sum(prices)

            pair_stat = AirportPairStatistics(
                    origin=origin,
                    destination=destination,
                    flight_count=flight_count,
                    average_price=round(avg_price, 2),
                    min_price=round(min_price, 2),
                    max_price=round(max_price, 2),
                    currency=currency or "Unknown"
                )
            pair_statistics.append(pair_stat)

    overall_avg_price = round(total_price_sum / total_flights, 2) if total_flights > 0 else 0
    return FlightAggregationResponse(
        pair_statistics=pair_statistics,
        total_flights=total_flights,
        overall_average_price=overall_avg_price,
        currency=currency or "Unknown"
    )