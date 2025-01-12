from fastapi                                    import FastAPI
from fastapi.middleware.cors                    import CORSMiddleware

from api.api                                    import api

app = FastAPI(title = "API", description = "API for Corporate Travel Booking System", version = "0.1")

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost",
]

app.include_router(api, prefix="/api/v1")

app.add_middleware(
    CORSMiddleware,
    allow_origins       = origins,
    allow_credentials   = True,
    allow_methods       = ["*"],
    allow_headers       = ["*"],
)