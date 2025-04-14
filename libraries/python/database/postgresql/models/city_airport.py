from sqlalchemy import Column,String, Float, Integer, ForeignKey
from ..base import Base

class City(Base):
    __tablename__ = 'cities'

    # primary key
    id = Column(String, primary_key=True)
    city = Column(String)
    state_id = Column(String(2))
    lat = Column(Float)
    lng = Column(Float)
    ranking = Column(Integer)

    def __repr__(self):
        return f"<City id={self.id} name={self.city} state={self.state_id}>"
    
class Airport(Base):
    __tablename__ = 'airports'

    # primary key
    id = Column(String, primary_key=True)

    country_code = Column(String(2))
    country = Column (String)
    continent = Column(String)
    region_name = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    distance_from_cbd = Column(Integer)
    iata = Column(String(3))
    icao = Column(String(4))
    pop_rank = Column(Integer)
    loc_id = Column(String(10))
    city = Column(String)
    airport_name = Column(String)
    hub = Column(String)

    def __repr__(self):
        return f"<Airport id={self.id}, country={self.country}, region={self.region_name}, city={self.city}, IATA={self.iata}, name= {self.airport_name}"
    
class AirportServiceability(Base):
    __tablename__ = 'airport_serviceability'

    # primary key
    id = Column(String, primary_key=True)

    city_id = Column(String, ForeignKey('cities.id'))
    airport_id = Column (String)
    iata = Column(String(3))
    airport_name = Column(String)
    distance_miles = Column(Float)
    hub = Column(String)

    def __repr__(self):
        return f"<Serviceability id={self.id}, IATA={self.iata}, name= {self.airport_name}, distance(mi)= {self.distance_miles}"
    

