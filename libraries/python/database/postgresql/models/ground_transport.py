# from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
# from sqlalchemy.orm import relationship

# from ..base import Base

# class GroundTransport(Base):
#     __tablename__ = 'ground_transports'

#     id = Column(String, primary_key=True)
#     trip_id = Column(String, ForeignKey('trips.id'), nullable=False)
#     pickup_address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
#     dropoff_address_id = Column(String, ForeignKey('addresses.id'), nullable=False)
#     type_id = Column(String, ForeignKey('ground_transport_services.id'), nullable=False)
#     voucher_id = Column(String, nullable=True)
#     estimated_price = Column(Float, nullable=True)
#     actual_price = Column(Float, nullable=True)
#     status_id = Column(String, ForeignKey('ground_transport_statuses.id'), nullable=False)

#     #Relationships
#     trip = relationship("Trip", back_populates="ground_transports")
#     pickup_address = relationship("Address", foreign_keys=[pickup_address_id], back_populates="ground_transport_pickups")
#     dropoff_address = relationship("Address", foreign_keys=[dropoff_address_id], back_populates="ground_transport_dropoffs")
#     service_type = relationship("GroundTransportServices", back_populates="ground_transports")
#     status = relationship("GroundTransportStatus", back_populates="ground_transports")

#     def __repr__(self):
#         return f"<GroundTransport(id='{self.id}', trip_id='{self.trip_id}', pickup_address_id='{self.pickup_address_id}', dropoff_address_id='{self.dropoff_address_id}', type_id='{self.type_id}', voucher_id='{self.voucher_id}', estimated_price='{self.estimated_price}', actual_price='{self.actual_price}', status_id='{self.status_id}')>"

# class GroundTransportStatus(Base):
#     __tablename__ = 'ground_transport_statuses'

#     id = Column(String, primary_key=True)
#     code = Column(String, nullable=False)
#     description = Column(String, nullable=False)
#     is_active = Column(Boolean, nullable=False, default=True)
#     display_order = Column(Integer, nullable=False)

#     #Relationships
#     ground_transports = relationship("GroundTransport", back_populates="status")

#     def __repr__(self):
#         return f"<GroundTransportStatus(id='{self.id}', code='{self.code}', description='{self.description}')>"