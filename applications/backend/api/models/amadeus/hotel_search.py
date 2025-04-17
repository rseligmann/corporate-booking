from typing import List, Optional, Literal, Union
from pydantic import BaseModel, Field, HttpUrl
from enum import Enum
from datetime import datetime, date

class Address(BaseModel):
    countryCode: str = Field(..., pattern=r"[a-zA-Z]{2}", description="ISO 3166-1 country code")

class GeoCode(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude of the position expressed in decimal degrees (WSG 84)")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude of the position expressed in decimal degrees (WSG 84)")

class Distance(BaseModel):
    unit: Literal["NIGHT", "PIXELS", "KILOGRAMS", "POUNDS", "CENTIMETERS", "INCHES", 
                  "BITS_PER_PIXEL", "KILOMETERS", "MILE", "BYTES", "KILOBYTES", "KM"] = Field(
        ..., title="Unit", description="Unit type."
    )
    value: Optional[float] = Field(None, description="Decimal distance value")
    displayValue: Optional[str] = None
    isUnlimited: Optional[str] = Field(None, description="Conveys whether the distance is limited or not")

class Hotel(BaseModel):
    subtype: Optional[str] = Field(None, description="Location sub-type (e.g. airport, port, rail-station, restaurant, atm...)")
    name: str = Field(..., description="Hotel Name")
    timeZoneName: Optional[str] = Field(None, description="Olson format name (TZ) of the location time zone")
    iataCode: str = Field(..., description="IATA location code")
    address: Optional[Address] = None
    geoCode: GeoCode
    hotelId: str = Field(..., pattern=r"^[A-Z0-9]{8}$", description="Amadeus Property Code (8 chars)")
    chainCode: str = Field(..., pattern=r"^[A-Z]{2}$", description="Brand or Merchant (Amadeus 2 chars Code)")
    distance: Optional[Distance] = None
    last_update: Optional[datetime] = Field(None, description="Last time the content was updated by a provider")
    dupeId: Optional[int] = None

class Links(BaseModel):
    self: HttpUrl = Field(..., description="Link to the same page")
    first: Optional[HttpUrl] = Field(None, description="Link to the first page")
    prev: Optional[HttpUrl] = Field(None, description="Link to the previous page")
    next: Optional[HttpUrl] = Field(None, description="Link to the next page")
    last: Optional[HttpUrl] = Field(None, description="Link to the last page")

class Meta(BaseModel):
    count: int = Field(..., ge=0, description="Total number of object(s) retrieved")
    sort: Optional[List[str]] = Field(None, description="Sorting fields criteria and their associated priority and direction")
    links: Links

class HotelSearchResponse(BaseModel):
    data: List[Hotel]
    meta: Meta

########################################################################

class HotelSearchRequest(BaseModel):
    latitude: float = Field(...,description="The latitude of the searched geographical point expressed in geometric degrees", ge=-90, le=90)
    longitude: float = Field(..., description="The longitude of the searched geographical point expressed in geometric degrees", ge=-180, le=180)
    radius: int = Field(5, description="Maximum distance from the geographical coordinates expressed in defined units", gt=0)
    radiusUnit: Literal["KM", "MILE"] = Field("MILE", description="Unit of measurement used to express the radius (kilometer or mile)")
    chainCodes: Optional[List[str]] = Field(None,description="Array of hotel chain codes (2 capital alphabetic characters each)")
    amenities: Optional[Literal[
        "SWIMMING_POOL", "SPA", "FITNESS_CENTER", "AIR_CONDITIONING", "RESTAURANT", "PARKING", "PETS_ALLOWED", "AIRPORT_SHUTTLE", "BUSINESS_CENTER", 
        "DISABLED_FACILITIES", "WIFI", "MEETING_ROOMS", "NO_KID_ALLOWED", "TENNIS", "GOLF", "KITCHEN", "ANIMAL_WATCHING", "BABY-SITTING", 
        "BEACH", "CASINO", "JACUZZI", "SAUNA", "SOLARIUM", "MASSAGE", "VALET_PARKING", "BAR or LOUNGE", "KIDS_WELCOME", "NO_PORN_FILMS", "MINIBAR", 
        "TELEVISION", "WI-FI_IN_ROOM", "ROOM_SERVICE", "GUARDED_PARKG", "SERV_SPEC_MENU"
    ]] = Field(None, description="List of amenities to filter hotels by")
    ratings: Optional[List[Literal["1", "2", "3", "4", "5"]]] = Field(None,description="Hotel star ratings to filter by (up to 4 values)")
    hotelSource: Optional[Literal["BEDBANK", "DIRECTCHAIN", "ALL"]]= Field("ALL", description="Hotel source (BEDBANK for aggregators, DIRECTCHAIN for GDS/Distribution, ALL for both)")

########################################################################

class QualifiedFreeText(BaseModel):
    text: str
    lang: Optional[str] = None

class HotelProductEstimatedRoomType(BaseModel):
    category: Optional[str] = None
    beds: Optional[int] = None
    bedType: Optional[str] = None

class HotelProductRoomDetails(BaseModel):
    type: Optional[str] = Field(None, pattern=r"^[A-Z0-9*]{3}$", description="Room type code, 3 character identifier")
    typeEstimated: Optional[HotelProductEstimatedRoomType] = None
    description: Optional[QualifiedFreeText] = None

class HotelProductGuests(BaseModel):
    adults: Optional[int] = Field(..., description="Number of adult guests (1-9) per room", ge=1, le=9)
    childAges: Optional[List[int]] = Field(None, description="ages of each child at the time of check-out. If several children have the same age, the ages will be repeated.", ge=0, le=20 )

class Markup(BaseModel):
    amount: Optional[str] = None

class HotelProductPriceVariationsChanges(BaseModel):
    startDate: date = Field(..., description="Begin date of the period Format: YYYY-MM-DD")
    endDate: date = Field(..., description="End date of the period Format: YYYY-MM-DD")
    currency: Optional[str] = None
    sellingTotal: Optional[str] = Field(None, description="sellingTotal = Total + margins + markup + totalFees - discounts")
    total: Optional[str] = Field(None, description="total = base + totalTaxes")
    base: Optional[str] = None
    markups: Optional[list[Markup]] = None

class HotelProductPriceVariationsAverage(BaseModel):
    currency: Optional[str] = None
    sellingTotal: Optional[str] = Field(None, description="sellingTotal = Total + margins + markup + totalFees - discounts")
    total: Optional[str] = Field(None, description="total = base + totalTaxes")
    base: Optional[str] = None
    markups: Optional[list[Markup]] = None

class HotelProductPriceVariations(BaseModel):
    average: Optional[HotelProductPriceVariationsAverage] = None
    changes: Optional[List[HotelProductPriceVariationsChanges]] = None

class Tax(BaseModel):
    amount: Optional[str] = None
    currency: Optional[str] = None
    code: Optional[str] = Field(None, description="(ISO) Tax code.It is a two-letter country code")
    percentage: Optional[str] = Field(None, description="In the case of a tax on TST value, the percentage of the tax will be indicated in this field.")
    included: Optional[bool] = None
    description: Optional[str] = None
    pricingFrequency: Optional[str] = Field(None, description="Specifies if the tax applies per stay or per night")
    pricingMode: Optional[str] = Field(None, description="Specifies if the tax applies per occupant or per room")

class HotelProductHotelPrice(BaseModel):
    currency: Optional[str] = Field(None, description="	string currency Code apply to all elements of the price")
    sellingTotal: Optional[str] = Field(None, description="sellingTotal = Total + margins + markup + totalFees - discounts")
    total: Optional[str] = Field(None, description="total = base + totalTaxes")
    base: Optional[str] = None
    taxes: Optional[List[Tax]] = None
    markups: Optional[List[Markup]] = None
    variations: Optional[HotelProductPriceVariations] = None

class HotelProductCancellationPolicy(BaseModel):
    type: Optional[str] = None
    amount: Optional[str] = None
    numberOfNights: Optional[int] = None
    percentage: Optional[str] = None
    deadline: Optional[date] = None
    description: Optional[QualifiedFreeText] = None
    
class HotelProductPaymentPolicy(BaseModel):
    creditCards: Optional[List[str]] = None
    methods: Optional[List[str]] = None

class HotelProductGuaranteePolicy(BaseModel):
    description: Optional[QualifiedFreeText] = None
    acceptedPayments: Optional[HotelProductPaymentPolicy] = None

class HotelProductDepositPolicy(BaseModel):
    amount: Optional[str] = None
    deadline: Optional[datetime] = None
    description: Optional[QualifiedFreeText] = None
    acceptedPayments: Optional[HotelProductPaymentPolicy] = None

class HotelProductHoldPolicy(BaseModel):
    deadline: datetime = Field(..., description="The date and time of the deadline in ISO 8601")

class HotelProductCheckInOutPolicy(BaseModel):
    checkIn: Optional[str] = None
    CheckInDescription: Optional[QualifiedFreeText] = None
    checkOut: Optional[str] = None
    CheckOutDescription: Optional[QualifiedFreeText] = None

class HotelProductPolicyDetails(BaseModel):
    paymentType: Optional[Literal["guarantee", "deposit", "prepay", "holdtime", "none"]] = None
    guarantee: Optional[HotelProductGuaranteePolicy] = None
    deposit: Optional[HotelProductDepositPolicy] = None
    prepay: Optional[HotelProductDepositPolicy] = None
    holdTime: Optional[HotelProductHoldPolicy] = None
    cancellation: Optional[List[HotelProductCancellationPolicy]] = None
    checkInOut: Optional[HotelProductCheckInOutPolicy] = None
    self: Optional[str] = None

class HotelProductRateFamily(BaseModel):
    code: Optional[str] = Field(None, pattern=r"[A-Z0-9]{3}", description="The estimated rate family (PRO,FAM,GOV)")
    type: Optional[str] = Field(None, pattern=r"[PNC]", description="The type of the rate (public=P, negotiated=N, conditional=C)")

class HotelProductCommission(BaseModel):
    percentage: Optional[str] = Field(None, pattern=r"^\d+(\.\d+)?$", description="Percentage of the commission paid to the travel seller. Value is between 0 and 100")
    amount: Optional[str] = Field(None, pattern=r"^\d+(\.\d+)?$", description="Amount of the commission paid to the travel seller. The amount is always linked to the currency code of the offer")
    description: Optional[QualifiedFreeText] = None

class HotelOffer(BaseModel):
    type: Optional[Literal["hotel-offer"]] = None
    id: str = Field(..., pattern=r"^[A-Z0-9]*$", description="Unique identifier of this offer")
    checkInDate: Optional[date] = Field(None, description="Check-in date (YYYY-MM-DD)")
    checkOutDate: Optional[date] = Field(None, description="Check-out date (YYYY-MM-DD)")
    roomQuantity: Optional[str] = None
    rateCode: str = Field(..., pattern=r"^[A-Z0-9*]{3}$", description="Special Rate - Provider Response Code (3 chars)")
    rateFamilyEstimated: Optional[HotelProductRateFamily] = None
    category: Optional[str] = None
    description: Optional[QualifiedFreeText] = None
    commission: Optional[HotelProductCommission] = None
    boardType: Optional[str] = None
    room: HotelProductRoomDetails
    guests: Optional[HotelProductGuests] = None
    price: HotelProductHotelPrice
    policies: Optional[HotelProductPolicyDetails] = None
    self: Optional[str] = None

class HotelContent(BaseModel):
    hotelId: Optional[str] = Field(..., pattern=r"^[A-Z0-9]{8}$", description="Amadeus Property Code (8 chars)")
    chainCode: Optional[str] = Field(None, pattern=r"^[A-Z]{2}$", description="Brand or Merchant (Amadeus 2 chars Code)")
    brandCode: Optional[str] = Field(None, pattern=r"^[A-Z]{2}$", description="Brand (Amadeus 2 chars Code)")
    dupeId: Optional[str] = None
    name: Optional[str] = None
    cityCode: Optional[str] = None

class HotelOffers(BaseModel):
    type: str
    available: Optional[bool] = None
    self: Optional[str] = None
    offers: Optional[List[HotelOffer]] = None
    hotel: HotelContent

class MultiResponse(BaseModel):
    data: List[HotelOffers]

########################################################################

class HotelOffersSearchRequest(BaseModel):
    hotelIds: List[str] = Field(..., description="Amadeus property codes on 8 chars. Mandatory parameter for a search by predefined list of hotels.")
    adults: Optional[int] = Field(1, description="Number of adult guests (1-9) per room.", ge=1, le=9,)  
    checkInDate: Optional[date] = Field(None, description="Check-in date of the stay (hotel local date). Format YYYY-MM-DD. The lowest accepted value is the present date (no dates in the past).",)
    checkOutDate: Optional[date] = Field(None, description="Check-out date of the stay (hotel local date). Format YYYY-MM-DD. The lowest accepted value is checkInDate+1.")
    countryOfResidence: Optional[str] = Field(None, description="Code of the country of residence of the traveler expressed using ISO 3166-1 format.")
    roomQuantity: Optional[int] = Field(1, description="Number of rooms requested (1-9).", ge=1, le=9)
    priceRange: Optional[str] = Field(None, description="Filter hotel offers by price per night interval (ex: 200-300 or -300 or 100). It is mandatory to include a currency when this field is set.")
    currency: Optional[str] = Field(None, description="Use this parameter to request a specific currency. ISO currency code. If a hotel does not support the requested currency, the prices will be returned in the local currency of the hotel.") 
    paymentPolicy: Optional[Literal["GUARANTEE", "DEPOSIT", "NONE"]] = Field("NONE", description="Filter the response based on a specific payment type. NONE means all types (default).") 
    boardType: Optional[Literal["ROOM_ONLY", "BREAKFAST", "HALF_BOARD", "FULL_BOARD", "ALL_INCLUSIVE"]] = Field(None, description="Filter response based on available meals." )
    includeClosed: Optional[bool] = Field( None, description="Show all properties (include sold out) or available only. For sold out properties, please check availability on other dates." )
    bestRateOnly: Optional[bool] = Field(True, description="Used to return only the cheapest offer per hotel or all available offers.")
    lang: Optional[str] = Field(None,description="Requested language of descriptive texts. Examples: FR, fr, fr-FR. If a language is not available the text will be returned in English. ISO language code.")

########################################################################

#RatingType = Literal["1", "2", "3", "4", "5"]

class HotelCustomSearchRequest(BaseModel):
    latitude: float = Field(...,description="The latitude of the searched geographical point expressed in geometric degrees", ge=-90, le=90)
    longitude: float = Field(..., description="The longitude of the searched geographical point expressed in geometric degrees", ge=-180, le=180)
    radius: int = Field(3, description="Maximum distance from the geographical coordinates expressed in defined units", gt=0)
    ratings: Optional[List[Literal["1", "2", "3", "4", "5"]]] = Field(None,  description="Hotel star ratings to filter by (up to 4 values)")
    #ratings: Optional[List[str]] = Field(None,  description="Hotel star ratings to filter by (up to 4 values)")
    checkInDate: Optional[date] = Field(None, description="Check-in date of the stay (hotel local date). Format YYYY-MM-DD. The lowest accepted value is the present date (no dates in the past).",)
    checkOutDate: Optional[date] = Field(None, description="Check-out date of the stay (hotel local date). Format YYYY-MM-DD. The lowest accepted value is checkInDate+1.")

class HotelAggregationResponse(BaseModel):
    total_hotels: int = Field(..., description="Total number of hotels")
    total_available_hotels: int = Field(..., description="Total number of hotels with AVAILABLE rooms")
    overall_average_night_price: float = Field(..., description='Overall average price across all hotels per Night')
    overall_average_total_price: float = Field(..., description='Overall average total price across all hotels')
    currency: str = Field(..., description="Currency of the prices")