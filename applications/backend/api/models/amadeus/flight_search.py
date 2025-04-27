from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Literal
from datetime import datetime, date

class Link(BaseModel):
    self: str

class Meta(BaseModel):
    count: int
    links: Link

class Fee(BaseModel):
    amount: str
    type: str

class Price(BaseModel):
    currency: str
    total: str
    base: str
    fees: Optional[List[Fee]] =[]
    grandTotal: Optional[str] = None

class PricingOptions(BaseModel):
    fareType: List[str]
    includedCheckedBagsOnly: bool

class Aircraft(BaseModel):
    code: str

class Operating(BaseModel):
    carrierCode: str

class Location(BaseModel):
    iataCode: str
    terminal: Optional[str] = None
    at: datetime

class Segment(BaseModel):
    departure: Location
    arrival: Location
    carrierCode: str
    number: str
    aircraft: Aircraft
    operating: Optional[Operating] = None
    duration: str
    id: str
    numberOfStops: int
    blacklistedInEU: bool

class Itinerary(BaseModel):
    duration: str
    segments: List[Segment]

class IncludedCheckedBags(BaseModel):
    quantity: Optional[int] = None
    weight: Optional[int] = None
    weightUnit: Optional[str] = None

class FareDetailsBySegment(BaseModel):
    segmentId: str
    cabin: str
    fareBasis: str
    class_: str = Field(..., alias="class")
    includedCheckedBags: Optional[IncludedCheckedBags] = None

class TravelerPricing(BaseModel):
    travelerId: str
    fareOption: str
    travelerType: str
    price: Price
    fareDetailsBySegment: List[FareDetailsBySegment]

class FlightOffer(BaseModel):
    type: str
    id: str
    source: str
    instantTicketingRequired: bool
    nonHomogeneous: bool
    oneWay: bool
    lastTicketingDate: str
    numberOfBookableSeats: int
    itineraries: List[Itinerary]
    price: Price
    pricingOptions: PricingOptions
    validatingAirlineCodes: List[str]
    travelerPricings: List[TravelerPricing]

class LocationInfo(BaseModel):
    cityCode: str
    countryCode: str

class Dictionaries(BaseModel):
    locations: Dict[str, LocationInfo]
    aircraft: Optional[Dict[str, str]] = None
    currencies: Optional[Dict[str, str]] = None
    carriers: Optional[Dict[str, str]] = None

class FlightOffersResponse(BaseModel):
    meta: Meta
    data: Optional[List[FlightOffer]] = []
    dictionaries: Optional[Dictionaries] = None


class TravelClass(str):
    ECONOMY = "ECONOMY"
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY"
    BUSINESS = "BUSINESS"
    FIRST = "FIRST"

class FlightOffersRequest(BaseModel):
    originLocationCode: str = Field(..., description="City/airport IATA code from which the traveler will depart, e.g. BOS for Boston")
    destinationLocationCode: str = Field(..., description="City/airport IATA code to which the traveler is going, e.g. PAR for Paris")
    departureDate: date = Field(..., description="The date on which the traveler will depart from the origin in ISO 8601 YYYY-MM-DD format")
    returnDate: Optional[date] = Field(None, description="The date on which the traveler will depart from the destination to return to the origin in ISO 8601 format")
    adults: int = Field(default=1, ge=1, description="The number of adult travelers (age 12 or older on date of departure)")
    children: Optional[int] = Field(None, ge=0, description="The number of child travelers (older than age 2 and younger than age 12 on date of departure)")
    infants: Optional[int] = Field(None, ge=0, description="The number of infant travelers (whose age is less or equal to 2 on date of departure)")
    travelClass: Optional[Literal["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]] = Field(None, description="The minimum travel class quality for the flight")
    includedAirlineCodes: Optional[str] = Field(None, description="Airlines to include, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X")
    excludedAirlineCodes: Optional[str] = Field(None, description="Airlines to exclude, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X")
    nonStop: Optional[bool] = Field(False, description="If true, search only for non-stop flights from origin to destination")
    currencyCode: Optional[str] = Field(None, description="The preferred currency for the flight offers, specified in ISO 4217 format, e.g. EUR")
    maxPrice: Optional[int] = Field(None, gt=0, description="Maximum price per traveler, should be a positive number with no decimals")
    max: Optional[int] = Field(250, ge=1, description="Maximum number of flight offers to return")
    
    # custom fields to filter Amadeus response
    arrival_time_window_start: Optional[datetime] = Field(None, description="Earliest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    arrival_time_window_end: Optional[datetime] = Field(None, description="Latest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    return_departure_time_window_start: Optional[datetime] = Field(None, description="Earliest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    return_departure_time_window_end: Optional[datetime] = Field(None, description="Latest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    max_stops: Optional[Literal["ANY", "DIRECT", "ONE_STOP", "TWO_STOPS"]] = Field(None, description="Maximum number of stops allowed")

class FlightAggregationRequest(BaseModel):
    originLocationCodes: List[str] = Field(..., min_length=1, description="List of city/airport IATA code from which the traveler will depart, e.g. BOS for Boston")
    destinationLocationCodes: List[str] = Field(..., min_length=1, description="City/airport IATA code to which the traveler is going, e.g. PAR for Paris")
    departureDate: date = Field(..., description="The date on which the traveler will depart from the origin in ISO 8601 YYYY-MM-DD format")
    returnDate: Optional[date] = Field(None, description="The date on which the traveler will depart from the destination to return to the origin in ISO 8601 format")
    adults: int = Field(default=1, ge=1, description="The number of adult travelers (age 12 or older on date of departure)")
    children: Optional[int] = Field(None, ge=0, description="The number of child travelers (older than age 2 and younger than age 12 on date of departure)")
    infants: Optional[int] = Field(None, ge=0, description="The number of infant travelers (whose age is less or equal to 2 on date of departure)")
    travelClass: Optional[Literal["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"]] = Field( None, description="The minimum travel class quality for the flight")
    includedAirlineCodes: Optional[str] = Field(None, description="Airlines to include, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X")
    excludedAirlineCodes: Optional[str] = Field(None, description="Airlines to exclude, specified as comma-separated IATA airline codes, e.g. 6X,7X,8X")
    nonStop: Optional[bool] = Field(False, description="If true, search only for non-stop flights from origin to destination")
    currencyCode: Optional[str] = Field(None, description="The preferred currency for the flight offers, specified in ISO 4217 format, e.g. EUR")
    maxPrice: Optional[int] = Field(None, gt=0, description="Maximum price per traveler, should be a positive number with no decimals")
    max: Optional[int] = Field(250, ge=1, description="Maximum number of flight offers to return")
    
    # custom fields to filter Amadeus response
    arrival_time_window_start: Optional[datetime] = Field(None, description="Earliest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    arrival_time_window_end: Optional[datetime] = Field(None, description="Latest acceptable arrival time at destination in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    return_departure_time_window_start: Optional[datetime] = Field(None, description="Earliest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    return_departure_time_window_end: Optional[datetime] = Field(None, description="Latest acceptable departure time from destination on return in ISO8601 format YYYY-MM-ddThh:mm:ss format, e.g. 2017-02-10T20:40:00")
    max_stops: Optional[Literal["ANY", "DIRECT", "ONE_STOP", "TWO_STOPS"]] = Field(None, description="Maximum number of stops allowed")

class AirportPairStatistics(BaseModel):
    origin: str = Field(..., description="Departure airport/city IATA code")
    destination: str = Field(..., description="Arrival airport/city IATA code")
    flight_count: int = Field(..., description="Number of flights found for this pair")
    average_price: float = Field(..., description="Average price of flights for this pair")
    min_price: float = Field(..., description="Minimum price of flights for this pair")
    max_price: float = Field(..., description="Maximum price of flights for this pair")
    currency: str = Field(..., description="Currency of the prices")

class FlightAggregationResponse(BaseModel):
    pair_statistics: List[AirportPairStatistics] = Field(..., description="Statistics for each origin-destination pair")
    total_flights: int = Field(..., description="Total number of flights across all pairs")
    overall_average_price: float = Field(..., description="Overall average price across all flights")
    currency: str = Field(..., description="Currency of the prices")