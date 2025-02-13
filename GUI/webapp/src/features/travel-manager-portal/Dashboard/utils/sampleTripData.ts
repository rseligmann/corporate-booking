import { TripDetails } from "@/types";

export const getSampleTripData = (): TripDetails[] => {
    return [
        {
            id: 1,
            guest: {
              name: "Sarah Johnson",
              email: "sarah.j@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "AA1234",
                airline: "American Airlines",
                origin: "LAX",
                destination: "JFK",
                departureTime: new Date("2025-03-15T08:30:00"),
                arrivalTime: new Date("2025-03-15T16:45:00"),
                price: 450.00
              },
              return: {
                flightNumber: "AA1235",
                airline: "American Airlines",
                origin: "JFK",
                destination: "LAX",
                departureTime: new Date("2025-03-20T18:30:00"),
                arrivalTime: new Date("2025-03-20T22:15:00"),
                price: 425.00
              }
            },
            hotel: {
              name: "The Ritz-Carlton New York",
              location: "New York City",
              check_in: new Date("2025-03-15T15:00:00"),
              check_out: new Date("2025-03-20T11:00:00"),
              room_type: "Deluxe King",
              price: 2500.00
            },
            trip_type: "Interview",
            status: "Upcoming"
          },
          {
            id: 2,
            guest: {
              name: "Michael Chen",
              email: "mchen@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "UA789",
                airline: "United Airlines",
                origin: "SFO",
                destination: "HNL",
                departureTime: new Date("2025-04-01T11:00:00"),
                arrivalTime: new Date("2025-04-01T14:30:00"),
                price: 650.00
              }
            },
            hotel: {
              name: "Four Seasons Resort Maui",
              location: "Maui",
              check_in: new Date("2025-04-01T16:00:00"),
              check_out: new Date("2025-04-08T10:00:00"),
              room_type: "Ocean View Suite",
              price: 4200.00
            },
            trip_type: "Vacation",
            status: "Pending"
          },
          {
            id: 3,
            guest: {
              name: "Emily Rodriguez",
              email: "e.rodriguez@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "DL456",
                airline: "Delta Airlines",
                origin: "ATL",
                destination: "CDG",
                departureTime: new Date("2025-05-10T19:15:00"),
                arrivalTime: new Date("2025-05-11T10:30:00"),
                price: 875.00
              },
              return: {
                flightNumber: "DL457",
                airline: "Delta Airlines",
                origin: "CDG",
                destination: "ATL",
                departureTime: new Date("2025-05-17T12:45:00"),
                arrivalTime: new Date("2025-05-17T16:30:00"),
                price: 890.00
              }
            },
            hotel: {
              name: "Le Bristol Paris",
              location: "Paris",
              check_in: new Date("2025-05-11T14:00:00"),
              check_out: new Date("2025-05-17T11:00:00"),
              room_type: "Superior Suite",
              price: 5600.00
            },
            trip_type: "Conference",
            status: "Upcoming"
          },
          {
            id: 4,
            guest: {
              name: "David Smith",
              email: "d.smith@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "WN221",
                airline: "Southwest Airlines",
                origin: "MDW",
                destination: "LAS",
                departureTime: new Date("2025-03-25T06:00:00"),
                arrivalTime: new Date("2025-03-25T08:15:00"),
                price: 225.00
              },
              return: {
                flightNumber: "WN224",
                airline: "Southwest Airlines",
                origin: "LAS",
                destination: "MDW",
                departureTime: new Date("2025-03-28T09:30:00"),
                arrivalTime: new Date("2025-03-28T14:45:00"),
                price: 245.00
              }
            },
            hotel: {
              name: "Bellagio",
              location: "Las Vegas",
              check_in: new Date("2025-03-25T15:00:00"),
              check_out: new Date("2025-03-28T11:00:00"),
              room_type: "Fountain View Room",
              price: 890.00
            },
            trip_type: "Training",
            status: "Upcoming"
          },
          {
            id: 5,
            guest: {
              name: "Lisa Wong",
              email: "lwong@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "JL007",
                airline: "Japan Airlines",
                origin: "JFK",
                destination: "NRT",
                departureTime: new Date("2025-06-01T13:45:00"),
                arrivalTime: new Date("2025-06-02T16:15:00"),
                price: 1250.00
              },
              return: {
                flightNumber: "JL008",
                airline: "Japan Airlines",
                origin: "NRT",
                destination: "JFK",
                departureTime: new Date("2025-06-08T18:30:00"),
                arrivalTime: new Date("2025-06-08T17:45:00"),
                price: 1300.00
              }
            },
            hotel: {
              name: "Park Hyatt Tokyo",
              location: "Tokyo",
              check_in: new Date("2025-06-02T15:00:00"),
              check_out: new Date("2025-06-08T12:00:00"),
              room_type: "Park Suite",
              price: 4800.00
            },
            trip_type: "Contractor",
            status: "Pending"
          },
          {
            id: 6,
            guest: {
              name: "James Wilson",
              email: "jwilson@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "BA184",
                airline: "British Airways",
                origin: "EWR",
                destination: "LHR",
                departureTime: new Date("2025-07-15T21:30:00"),
                arrivalTime: new Date("2025-07-16T09:45:00"),
                price: 780.00
              }
            },
            hotel: {
              name: "The Savoy",
              location: "London",
              check_in: new Date("2025-07-16T14:00:00"),
              check_out: new Date("2025-07-23T12:00:00"),
              room_type: "River View Deluxe",
              price: 3900.00
            },
            trip_type: "Interview",
            status: "In Progress"
          },
          {
            id: 7,
            guest: {
              name: "Maria Garcia",
              email: "mgarcia@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "IB6252",
                airline: "Iberia",
                origin: "MIA",
                destination: "MAD",
                departureTime: new Date("2025-08-05T16:20:00"),
                arrivalTime: new Date("2025-08-06T07:35:00"),
                price: 925.00
              },
              return: {
                flightNumber: "IB6253",
                airline: "Iberia",
                origin: "MAD",
                destination: "MIA",
                departureTime: new Date("2025-08-12T11:45:00"),
                arrivalTime: new Date("2025-08-12T15:20:00"),
                price: 880.00
              }
            },
            hotel: {
              name: "Hotel Ritz Madrid",
              location: "Madrid",
              check_in: new Date("2025-08-06T15:00:00"),
              check_out: new Date("2025-08-12T11:00:00"),
              room_type: "Deluxe Suite",
              price: 3200.00
            },
            trip_type: "Other",
            status: "Upcoming"
          },
          {
            id: 8,
            guest: {
              name: "Robert Taylor",
              email: "rtaylor@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "AC901",
                airline: "Air Canada",
                origin: "YYZ",
                destination: "YVR",
                departureTime: new Date("2025-09-20T07:30:00"),
                arrivalTime: new Date("2025-09-20T09:45:00"),
                price: 320.00
              },
              return: {
                flightNumber: "AC902",
                airline: "Air Canada",
                origin: "YVR",
                destination: "YYZ",
                departureTime: new Date("2025-09-25T10:30:00"),
                arrivalTime: new Date("2025-09-25T17:45:00"),
                price: 340.00
              }
            },
            hotel: {
              name: "Fairmont Pacific Rim",
              location: "Vancouver",
              check_in: new Date("2025-09-20T16:00:00"),
              check_out: new Date("2025-09-25T11:00:00"),
              room_type: "Harbor View Room",
              price: 1800.00
            },
            trip_type: "Interview",
            status: "Upcoming"
          },
          {
            id: 9,
            guest: {
              name: "Anna Kowalski",
              email: "akowalski@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "LH452",
                airline: "Lufthansa",
                origin: "ORD",
                destination: "MUC",
                departureTime: new Date("2025-10-01T15:45:00"),
                arrivalTime: new Date("2025-10-02T07:30:00"),
                price: 850.00
              }
            },
            hotel: {
              name: "Mandarin Oriental Munich",
              location: "Munich",
              check_in: new Date("2025-10-02T15:00:00"),
              check_out: new Date("2025-10-09T11:00:00"),
              room_type: "Junior Suite",
              price: 4100.00
            },
            trip_type: "Interview",
            status: "Pending"
          },
          {
            id: 10,
            guest: {
              name: "Thomas Anderson",
              email: "tanderson@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "QF12",
                airline: "Qantas",
                origin: "LAX",
                destination: "SYD",
                departureTime: new Date("2025-11-15T22:30:00"),
                arrivalTime: new Date("2025-11-17T07:45:00"),
                price: 1450.00
              },
              return: {
                flightNumber: "QF11",
                airline: "Qantas",
                origin: "SYD",
                destination: "LAX",
                departureTime: new Date("2025-11-25T11:30:00"),
                arrivalTime: new Date("2025-11-25T06:45:00"),
                price: 1380.00
              }
            },
            hotel: {
              name: "Park Hyatt Sydney",
              location: "Sydney",
              check_in: new Date("2025-11-17T15:00:00"),
              check_out: new Date("2025-11-25T11:00:00"),
              room_type: "Opera View Room",
              price: 5600.00
            },
            trip_type: "Interview",
            status: "Upcoming"
          },
          {
            id: 11,
            guest: {
              name: "Rachel Green",
              email: "rgreen@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "DL2468",
                airline: "Delta Airlines",
                origin: "SEA",
                destination: "MIA",
                departureTime: new Date("2024-01-05T06:30:00"),
                arrivalTime: new Date("2024-01-05T15:45:00"),
                price: 385.00
              },
              return: {
                flightNumber: "DL2469",
                airline: "Delta Airlines",
                origin: "MIA",
                destination: "SEA",
                departureTime: new Date("2024-01-12T16:30:00"),
                arrivalTime: new Date("2024-01-12T20:15:00"),
                price: 395.00
              }
            },
            hotel: {
              name: "Fontainebleau Miami Beach",
              location: "Miami",
              check_in: new Date("2024-01-05T16:00:00"),
              check_out: new Date("2024-01-12T11:00:00"),
              room_type: "Oceanfront Junior Suite",
              price: 2800.00
            },
            trip_type: "Contractor",
            status: "In Progress"
          },
          {
            id: 12,
            guest: {
              name: "Marcus Johnson",
              email: "mjohnson@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "EK203",
                airline: "Emirates",
                origin: "JFK",
                destination: "DXB",
                departureTime: new Date("2023-12-10T22:30:00"),
                arrivalTime: new Date("2023-12-11T19:45:00"),
                price: 1750.00
              }
            },
            hotel: {
              name: "Burj Al Arab",
              location: "Dubai",
              check_in: new Date("2023-12-11T20:00:00"),
              check_out: new Date("2023-12-18T12:00:00"),
              room_type: "Deluxe Suite",
              price: 8500.00
            },
            trip_type: "Interview",
            status: "In Progress"
          },
          {
            id: 13,
            guest: {
              name: "Sophie Martin",
              email: "smartin@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "AF1180",
                airline: "Air France",
                origin: "BOS",
                destination: "CDG",
                departureTime: new Date("2024-02-01T19:15:00"),
                arrivalTime: new Date("2024-02-02T08:30:00"),
                price: 780.00
              },
              return: {
                flightNumber: "AF1181",
                airline: "Air France",
                origin: "CDG",
                destination: "BOS",
                departureTime: new Date("2024-02-05T11:45:00"),
                arrivalTime: new Date("2024-02-05T14:30:00"),
                price: 795.00
              }
            },
            hotel: {
              name: "Hotel du Louvre",
              location: "Paris",
              check_in: new Date("2024-02-02T15:00:00"),
              check_out: new Date("2024-02-05T11:00:00"),
              room_type: "Classic Room",
              price: 1200.00
            },
            trip_type: "Interview",
            status: "In Progress"
          },
          {
            id: 14,
            guest: {
              name: "Alexander Kim",
              email: "akim@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "NH1075",
                airline: "All Nippon Airways",
                origin: "SFO",
                destination: "HND",
                departureTime: new Date("2023-11-20T11:00:00"),
                arrivalTime: new Date("2023-11-21T15:30:00"),
                price: 1150.00
              }
            },
            hotel: {
              name: "Aman Tokyo",
              location: "Tokyo",
              check_in: new Date("2023-11-21T16:00:00"),
              check_out: new Date("2023-11-28T11:00:00"),
              room_type: "Deluxe Room",
              price: 6200.00
            },
            trip_type: "Interview",
            status: "In Progress"
          },
          {
            id: 15,
            guest: {
              name: "Isabella Santos",
              email: "isantos@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "LA2345",
                airline: "LATAM Airlines",
                origin: "MIA",
                destination: "GRU",
                departureTime: new Date("2024-01-15T22:30:00"),
                arrivalTime: new Date("2024-01-16T09:45:00"),
                price: 890.00
              },
              return: {
                flightNumber: "LA2346",
                airline: "LATAM Airlines",
                origin: "GRU",
                destination: "MIA",
                departureTime: new Date("2024-01-22T11:30:00"),
                arrivalTime: new Date("2024-01-22T17:45:00"),
                price: 910.00
              }
            },
            hotel: {
              name: "Palácio Tangará",
              location: "São Paulo",
              check_in: new Date("2024-01-16T15:00:00"),
              check_out: new Date("2024-01-22T12:00:00"),
              room_type: "Premium Room",
              price: 3200.00
            },
            trip_type: "Intern",
            status: "In Progress"
          },
          // Future Trips
          {
            id: 16,
            guest: {
              name: "Oliver Bennett",
              email: "obennett@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "VS23",
                airline: "Virgin Atlantic",
                origin: "LAX",
                destination: "LHR",
                departureTime: new Date("2025-05-01T16:30:00"),
                arrivalTime: new Date("2025-05-02T10:45:00"),
                price: 950.00
              }
            },
            hotel: {
              name: "Claridge's",
              location: "London",
              check_in: new Date("2025-05-02T15:00:00"),
              check_out: new Date("2025-05-09T11:00:00"),
              room_type: "Mayfair Suite",
              price: 4800.00
            },
            trip_type: "Intern",
            status: "Upcoming"
          },
          {
            id: 17,
            guest: {
              name: "Emma Thompson",
              email: "ethompson@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "QF9381",
                airline: "Qantas",
                origin: "MEL",
                destination: "AKL",
                departureTime: new Date("2025-04-10T08:30:00"),
                arrivalTime: new Date("2025-04-10T13:45:00"),
                price: 420.00
              },
              return: {
                flightNumber: "QF9382",
                airline: "Qantas",
                origin: "AKL",
                destination: "MEL",
                departureTime: new Date("2025-04-15T15:30:00"),
                arrivalTime: new Date("2025-04-15T17:45:00"),
                price: 390.00
              }
            },
            hotel: {
              name: "SO/ Auckland",
              location: "Auckland",
              check_in: new Date("2025-04-10T15:00:00"),
              check_out: new Date("2025-04-15T11:00:00"),
              room_type: "SO Studio",
              price: 1800.00
            },
            trip_type: "Conference",
            status: "Upcoming"
          },
          {
            id: 18,
            guest: {
              name: "Luis Ramirez",
              email: "lramirez@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "AM456",
                airline: "Aeromexico",
                origin: "ORD",
                destination: "MEX",
                departureTime: new Date("2025-06-20T10:15:00"),
                arrivalTime: new Date("2025-06-20T14:30:00"),
                price: 480.00
              }
            },
            hotel: {
              name: "St. Regis Mexico City",
              location: "Mexico City",
              check_in: new Date("2025-06-20T15:00:00"),
              check_out: new Date("2025-06-27T11:00:00"),
              room_type: "Deluxe Room",
              price: 2400.00
            },
            trip_type: "Interview",
            status: "Pending"
          },
          {
            id: 19,
            guest: {
              name: "Nina Patel",
              email: "npatel@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "EY130",
                airline: "Etihad Airways",
                origin: "IAD",
                destination: "AUH",
                departureTime: new Date("2025-07-15T21:45:00"),
                arrivalTime: new Date("2025-07-16T19:30:00"),
                price: 1650.00
              },
              return: {
                flightNumber: "EY131",
                airline: "Etihad Airways",
                origin: "AUH",
                destination: "IAD",
                departureTime: new Date("2025-07-22T02:30:00"),
                arrivalTime: new Date("2025-07-22T09:15:00"),
                price: 1580.00
              }
            },
            hotel: {
              name: "Emirates Palace",
              location: "Abu Dhabi",
              check_in: new Date("2025-07-16T20:00:00"),
              check_out: new Date("2025-07-22T12:00:00"),
              room_type: "Coral Room",
              price: 3900.00
            },
            trip_type: "Interview",
            status: "Upcoming"
          },
          {
            id: 20,
            guest: {
              name: "Christine Weber",
              email: "cweber@email.com"
            },
            flight: {
              outbound: {
                flightNumber: "LX167",
                airline: "Swiss International Air Lines",
                origin: "MIA",
                destination: "ZRH",
                departureTime: new Date("2025-08-01T17:30:00"),
                arrivalTime: new Date("2025-08-02T09:45:00"),
                price: 980.00
              },
              return: {
                flightNumber: "LX168",
                airline: "Swiss International Air Lines",
                origin: "ZRH",
                destination: "MIA",
                departureTime: new Date("2025-08-08T11:30:00"),
                arrivalTime: new Date("2025-08-08T16:15:00"),
                price: 950.00
              }
            },
            hotel: {
              name: "Baur au Lac",
              location: "Zurich",
              check_in: new Date("2025-08-02T15:00:00"),
              check_out: new Date("2025-08-08T11:00:00"),
              room_type: "Deluxe Room",
              price: 4200.00
            },
            trip_type: "Interview",
            status: "Pending"
          }
    ]
}