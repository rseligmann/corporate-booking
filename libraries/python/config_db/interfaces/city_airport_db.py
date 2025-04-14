from abc import ABC, abstractmethod
from config_types import City, AirportServiceability

class CityDB(ABC):
    """ Interface for city-related database operations """

    @abstractmethod
    async def fuzzy_search_cities(self, search_term: str, limit: int, threshold: float) -> list[City]:
        """Perform a fuzzy search on cities using trigram similarity"""
        pass

class AirportServiceabilityDB(ABC):
    """ Interface for airport_servicability database operations """

    @abstractmethod
    async def servicable_airports_by_city(self, city_id: str, max_distance: int, hubs: list[str]) -> list[AirportServiceability]:
         """ Performs a search of serviceable airports by city ID and distance """
         pass