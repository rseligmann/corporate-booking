from config_db import ConfigDB
from .base import BasePostgreSQLConfigDB, PostgresConfigDBConfig
from .address_db import PostgreSQLAddressDB
from .company_db import PostgreSQLCompanyDB
# from .flight_db import PostgreSQLFlightDB
# from .ground_transport_db import PostgreSQLTransportDB
# from .guest_db import PostgreSQLGuestDB
from .guest_preference_db import PostgreSQLGuestPreferenceDB
# from .hotel_db import PostgreSQLHotelDB
# from .perdiem_db import PostgreSQLPerDiemDB
# from .trip_db import PostgreSQLTripDB
from .user_db import PostgreSQLUserDB
from .city_airport_db import PostgreSQLCityAirportDB


class PSQLConfigDB(BasePostgreSQLConfigDB,
                  PostgreSQLAddressDB,
                  PostgreSQLCompanyDB,
                #   PostgreSQLFlightDB,
                #   PostgreSQLTransportDB,
                #   PostgreSQLGuestDB,
                  PostgreSQLGuestPreferenceDB,
                #   PostgreSQLHotelDB,
                #   PostgreSQLPerDiemDB,
                #   PostgreSQLTripDB,
                  PostgreSQLUserDB,
                  PostgreSQLCityAirportDB,
                  ConfigDB):
    """
    PostgreSQL implementation of the ConfigDB interface.
    This class combines all PostgreSQL implementations of the domain-specific interfaces.
    """
    
    @classmethod
    def connect(cls, config: PostgresConfigDBConfig):
        """Factory method to create a new PSQLConfigDB instance"""
        return cls(config)