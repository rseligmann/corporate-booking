from abc import ABC
from datetime import datetime

class Company(ABC):
    def __init__(self,
                company_id: str,
                name: str,
                location: str,
                address_id: str):
        self.company_id = company_id
        self.name = name
        self.location = location
        self.address_id = address_id
    
    def __str__(self) -> str:
        return f"""Company:
                   ID: {self.company_id}
                   Name: {self.name}
                   Location: {self.location}"""