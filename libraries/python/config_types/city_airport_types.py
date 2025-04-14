from abc import ABC

class City(ABC):
    def __init__(self,
                 city_id: str,
                 city: str,
                 state_id: str,
                 lat: float,
                 lng: float,
                 ranking: int):
        self.city_id = city_id
        self.city = city
        self.state_id = state_id
        self.lat = lat
        self.lng = lng
        self.ranking = ranking

    def __str__(self) -> str:
        return f"""City Type Details:
                   ID: {self.city_id}
                   City: {self.city}
                   State: {self.state_id}"""
    
class Airport(ABC):
    def __init__(self,
                 airport_id: str,
                 country_code: str, 
                 country: str,
                 continent: str,
                 region_name: str,
                 latitude: float,
                 longitude: float,
                 distance_from_cbd: int,
                 iata: str,
                 icao: str,
                 pop_rank: int,
                 loc_id: str,
                 city: str,
                 airport_name: str,
                 hub: str):
        self.airport_id = airport_id
        self.country_code= country_code
        self.country = country
        self.continent = continent
        self.region_name = region_name
        self.latitude = latitude
        self.longitude = longitude
        self.distance_from_cbd= distance_from_cbd
        self.iata = iata
        self.icao = icao
        self.pop_rank = pop_rank
        self.loc_id = loc_id
        self.city = city
        self.airport_name = airport_name
        self.hub = hub

    def __str__(self) -> str:
        return f"""Airport Type Details:
                   ID: {self.airport_id}
                   City: {self.city}
                   State: {self.region_name}
                   IATA: {self.iata}"""

class AirportServiceability(ABC):
    def __init__(self,
                 airport_serviceability_id: str,
                 city_id: str,
                 airport_id: str,
                 iata: str,
                 airport_name: str,
                 distance_miles: float,
                 hub: str):
        self.airport_serviceability_id = airport_serviceability_id
        self.city_id = city_id
        self.airport_id = airport_id
        self.iata = iata
        self.airport_name = airport_name
        self.distance_miles = distance_miles
        self.hub = hub

    def __str__(self) -> str:
        return f"""City Type Details:
                   ID: {self.airport_serviceability_id}
                   IATA: {self.iata}
                   Airport Name {self.airport_name}
                   Distance {self.distance_miles}
                   Hub {self.hub}"""