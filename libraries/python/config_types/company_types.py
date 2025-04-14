from abc import ABC
from datetime import datetime
from typing import Optional
from .base import AccountStatus, SubscriptionTier

class Company(ABC):
    def __init__(self,
                company_id: str,
                name: str,
                #address_id: Optional[str],
                status: AccountStatus,
                subscription_tier: SubscriptionTier,
                date_created: datetime,
                date_updated: datetime):
        self.company_id = company_id
        self.name = name
        #self.address_id = address_id
        self.status = status
        self.subscription_tier = subscription_tier
        self.date_created = date_created
        self.date_updated = date_updated
    
    def __str__(self) -> str:
        return f"""Company:
                   ID: {self.company_id}
                   Name: {self.name}
                   Status: {self.status}
                   Subscription: {self.subscription_tier}
                   Created: {self.date_created}
                   Updated: {self.date_updated}"""