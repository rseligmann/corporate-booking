# from typing import Optional, List
# from sqlalchemy import select
# from uuid import uuid4

# from config_types.ground_transport_types import GroundTransport
# from config_db.interfaces.ground_transport_db import GroundTransportDB
# from database.postgresql.models import GroundTransport as DBGroundTransport

# class PostgreSQLTransportDB(GroundTransportDB):
#     """PostgreSQL implementation of TransportDB interface."""
    
#     async def get_ground_transport(self, transport_id: str) -> Optional[GroundTransport]:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.id == transport_id)
#             result = session.execute(stmt)
#             db_transport = result.scalar_one_or_none()
            
#             if not db_transport:
#                 return None
                
#             return GroundTransport(
#                 transport_id=db_transport.id,
#                 trip_id=db_transport.trip_id,
#                 pickup_address_id=db_transport.pickup_address_id,
#                 dropoff_address_id=db_transport.dropoff_address_id,
#                 type_id=db_transport.type_id,
#                 voucher_id=db_transport.voucher_id,
#                 estimated_price=db_transport.estimated_price,
#                 actual_price=db_transport.actual_price,
#                 status_id=db_transport.status_id
#             )
    
#     async def get_ground_transports_by_trip(self, trip_id: str) -> List[GroundTransport]:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.trip_id == trip_id)
#             result = session.execute(stmt)
#             db_transports = result.scalars().all()
            
#             return [
#                 GroundTransport(
#                     transport_id=db_transport.id,
#                     trip_id=db_transport.trip_id,
#                     pickup_address_id=db_transport.pickup_address_id,
#                     dropoff_address_id=db_transport.dropoff_address_id,
#                     type_id=db_transport.type_id,
#                     voucher_id=db_transport.voucher_id,
#                     estimated_price=db_transport.estimated_price,
#                     actual_price=db_transport.actual_price,
#                     status_id=db_transport.status_id
#                 )
#                 for db_transport in db_transports
#             ]
    
#     async def get_ground_transports_by_service_type(self, service_type_id: str) -> List[GroundTransport]:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.type_id == service_type_id)
#             result = session.execute(stmt)
#             db_transports = result.scalars().all()
            
#             return [
#                 GroundTransport(
#                     transport_id=db_transport.id,
#                     trip_id=db_transport.trip_id,
#                     pickup_address_id=db_transport.pickup_address_id,
#                     dropoff_address_id=db_transport.dropoff_address_id,
#                     type_id=db_transport.type_id,
#                     voucher_id=db_transport.voucher_id,
#                     estimated_price=db_transport.estimated_price,
#                     actual_price=db_transport.actual_price,
#                     status_id=db_transport.status_id
#                 )
#                 for db_transport in db_transports
#             ]
    
#     async def insert_ground_transport(
#         self,
#         trip_id: str,
#         pickup_address_id: str,
#         dropoff_address_id: str,
#         type_id: str,
#         status_id: str,
#         voucher_id: Optional[str] = None,
#         estimated_price: Optional[float] = None,
#         actual_price: Optional[float] = None
#     ) -> GroundTransport:
#         with self.Session() as session:
#             db_transport = DBGroundTransport(
#                 id=str(uuid4()),
#                 trip_id=trip_id,
#                 pickup_address_id=pickup_address_id,
#                 dropoff_address_id=dropoff_address_id,
#                 type_id=type_id,
#                 voucher_id=voucher_id,
#                 estimated_price=estimated_price,
#                 actual_price=actual_price,
#                 status_id=status_id
#             )
#             session.add(db_transport)
#             session.commit()
            
#             return GroundTransport(
#                 transport_id=db_transport.id,
#                 trip_id=db_transport.trip_id,
#                 pickup_address_id=db_transport.pickup_address_id,
#                 dropoff_address_id=db_transport.dropoff_address_id,
#                 type_id=db_transport.type_id,
#                 voucher_id=db_transport.voucher_id,
#                 estimated_price=db_transport.estimated_price,
#                 actual_price=db_transport.actual_price,
#                 status_id=db_transport.status_id
#             )
    
#     async def update_ground_transport(self, transport: GroundTransport) -> GroundTransport:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.id == transport.transport_id)
#             result = session.execute(stmt)
#             db_transport = result.scalar_one_or_none()
            
#             if not db_transport:
#                 raise ValueError(f"Ground transport with ID {transport.transport_id} not found")
                
#             db_transport.trip_id = transport.trip_id
#             db_transport.pickup_address_id = transport.pickup_address_id
#             db_transport.dropoff_address_id = transport.dropoff_address_id
#             db_transport.type_id = transport.type_id
#             db_transport.voucher_id = transport.voucher_id
#             db_transport.estimated_price = transport.estimated_price
#             db_transport.actual_price = transport.actual_price
#             db_transport.status_id = transport.status_id
            
#             session.commit()
            
#             return transport
    
#     async def update_ground_transport_status(self, transport_id: str, status_id: str) -> GroundTransport:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.id == transport_id)
#             result = session.execute(stmt)
#             db_transport = result.scalar_one_or_none()
            
#             if not db_transport:
#                 raise ValueError(f"Ground transport with ID {transport_id} not found")
                
#             db_transport.status_id = status_id
#             session.commit()
            
#             return GroundTransport(
#                 transport_id=db_transport.id,
#                 trip_id=db_transport.trip_id,
#                 pickup_address_id=db_transport.pickup_address_id,
#                 dropoff_address_id=db_transport.dropoff_address_id,
#                 type_id=db_transport.type_id,
#                 voucher_id=db_transport.voucher_id,
#                 estimated_price=db_transport.estimated_price,
#                 actual_price=db_transport.actual_price,
#                 status_id=db_transport.status_id
#             )
    
#     async def update_ground_transport_actual_price(
#         self, transport_id: str, actual_price: float
#     ) -> GroundTransport:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.id == transport_id)
#             result = session.execute(stmt)
#             db_transport = result.scalar_one_or_none()
            
#             if not db_transport:
#                 raise ValueError(f"Ground transport with ID {transport_id} not found")
                
#             db_transport.actual_price = actual_price
#             session.commit()
            
#             return GroundTransport(
#                 transport_id=db_transport.id,
#                 trip_id=db_transport.trip_id,
#                 pickup_address_id=db_transport.pickup_address_id,
#                 dropoff_address_id=db_transport.dropoff_address_id,
#                 type_id=db_transport.type_id,
#                 voucher_id=db_transport.voucher_id,
#                 estimated_price=db_transport.estimated_price,
#                 actual_price=db_transport.actual_price,
#                 status_id=db_transport.status_id
#             )
    
#     async def delete_ground_transport(self, transport_id: str) -> bool:
#         with self.Session() as session:
#             stmt = select(DBGroundTransport).where(DBGroundTransport.id == transport_id)
#             result = session.execute(stmt)
#             db_transport = result.scalar_one_or_none()
            
#             if not db_transport:
#                 return False
                
#             session.delete(db_transport)
#             session.commit()
            
#             return True