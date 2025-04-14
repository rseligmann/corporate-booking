from pydantic import BaseModel

class CityBase(BaseModel):
    city_id: str
    city: str
    state_id: str
    lat: float
    lng: float
    ranking: int

class AirportServiceability(BaseModel):
    airport_serviceability_id: int
    city_id: str
    airport_id: str
    iata: str
    airport_name: str
    distance_miles: float
    hub: str