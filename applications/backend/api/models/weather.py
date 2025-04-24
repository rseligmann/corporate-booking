from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Daily(BaseModel):
    time: List[str]
    weather_code: List[int]
    temperature_2m_max: List[float]
    temperature_2m_min: List[float]
    precipitation_probability_max: List[int]

class DailyUnits(BaseModel):
    time: str
    weather_code: str
    temperature_2m_max: str
    temperature_2m_min: str
    precipitation_probability_max: str

class WeatherResponse(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude of the position expressed in decimal degrees (WSG 84)")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude of the position expressed in decimal degrees (WSG 84)")
    generationtime_ms: float
    utc_offset_seconds: float
    timezone: str
    timezone_abbreviation: str
    daily: Daily
    daily_units: DailyUnits

