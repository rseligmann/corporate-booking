from sqlalchemy.sql import func, select, desc
from config_types import City, AirportServiceability
from database.postgresql.models import City as DBCity, AirportServiceability as DBAirportServiceability
from config_db.interfaces import CityDB, AirportServiceabilityDB

class PostgreSQLCityAirportDB(CityDB, AirportServiceabilityDB):
    """PostgreSQL implementation of CityDB"""

    async def fuzzy_search_cities(self, search_term, limit, threshold):
        with self.tenantSession() as session:
            search_term_lower = search_term.lower()
            similarity_score = func.similarity(func.lower(DBCity.city), search_term_lower)
            stmt = select(
                DBCity,
                similarity_score.label('similarity')
                ).filter(
                    similarity_score >= threshold
                ).order_by(
                    DBCity.ranking,
                    desc('similarity')
                ).limit(limit)
            result = session.execute(stmt)
            db_cities = result.all()

            return [
                City(
                    city_id=db_city.id,
                    city=db_city.city,
                    state_id=db_city.state_id,
                    lat=db_city.lat,
                    lng=db_city.lng,
                    ranking=db_city.ranking
                )
                for db_city, similarity in db_cities # unpakc list of tuples
            ]
        
    async def servicable_airports_by_city(self, city_id: str, max_distance: int, hubs: list[str]) -> list[AirportServiceability]:
        """Performs a search of serviceable airports by city ID and distance"""
        with self.tenantSession() as session:
            stmt = select(
                DBAirportServiceability
            ).filter(
                DBAirportServiceability.city_id == city_id,
                DBAirportServiceability.distance_miles <= max_distance
            )
            if hubs and len(hubs) >0:
                stmt = stmt.filter(DBAirportServiceability.hub.in_(hubs))
            stmt = stmt.order_by(
                DBAirportServiceability.distance_miles
            )
            result = session.execute(stmt)
            db_airport_serviceability = result.scalars().all()

            return [
                AirportServiceability(
                    airport_serviceability_id=db_svc.id,
                    city_id=db_svc.city_id,
                    airport_id=db_svc.airport_id,
                    iata=db_svc.iata,
                    airport_name=db_svc.airport_name,
                    distance_miles=db_svc.distance_miles,
                    hub=db_svc.hub
                )
                for db_svc in db_airport_serviceability
            ]
            
