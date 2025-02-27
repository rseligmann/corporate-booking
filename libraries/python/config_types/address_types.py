from abc import ABC

class Address(ABC):
    def __init__(self,
                address_id: str,
                street: str,
                city: str,
                state: str,
                country: str,
                postal_code: str):
        self.address_id  = address_id
        self.street      = street
        self.city        = city
        self.state       = state
        self.country     = country
        self.postal_code = postal_code
    
    def __str__(self) -> str:
        return f"""{self.street}, {self.city}, {self.state}, {self.country}, {self.postal_code}"""
    
    def get_formatted_address(self) -> str:
        """Returns a nicely formatted address string"""
        return f"{self.street}\n{self.city}, {self.state} {self.postal_code}\n{self.country}"