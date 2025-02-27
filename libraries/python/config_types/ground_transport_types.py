from abc import ABC
from typing import Optional

class GroundTransport(ABC):
    def __init__(self,
                transport_id: str,
                trip_id: str,
                pickup_address_id: str,
                dropoff_address_id: str,
                type_id: str,
                voucher_id: Optional[str],
                estimated_price: Optional[float],
                actual_price: Optional[float],
                status_id: str):
        self.transport_id       = transport_id
        self.trip_id            = trip_id
        self.pickup_address_id  = pickup_address_id
        self.dropoff_address_id = dropoff_address_id
        self.type_id            = type_id
        self.voucher_id         = voucher_id
        self.estimated_price    = estimated_price
        self.actual_price       = actual_price
        self.status_id          = status_id
    
    def __str__(self) -> str:
        return f"""Ground Transport:
                   Type: {self.type_id}
                   Voucher: {self.voucher_id or 'N/A'}
                   Estimated Price: ${self.estimated_price:.2f if self.estimated_price else 'N/A'}
                   Actual Price: ${self.actual_price:.2f if self.actual_price else 'N/A'}
                   Status: {self.status_id}"""