import { Trip } from "@/types";

export const getSampleTripData = (): Trip[] => {
    return [
      {
        id: "T1001",
        guest: {
          id: "G1001",
          firstName: "Sarah",
          lastName: "Chen",
          email: "sarah.chen@company.com",
          phone: "+1-415-555-0101",
          nationality: "USA",
          passportNumber: "123456789",
          passportExpiryDate: new Date("2026-12-31"),
          loyaltyPrograms: [
            {
              provider: "United Airlines",
              programName: "MileagePlus",
              memberNumber: "UA123456",
              status: "1K"
            }
          ]
        },
        guestType: "intern",
        status: "Completed",
        travelPreferences: {
          id: "TP1001",
          guestType: "executive",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 5
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 150
        },
        itinerary: {
          id: "I1001",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-03-15"),
          endDate: new Date("2025-03-17")
        },
        flights: {
          outbound: {
            id: "F1001",
            bookingReference: "ABC123",
            flightNumber: "UA123",
            airline: "United Airlines",
            origin: {
              airport: "SFO",
              terminal: "3"
            },
            destination: {
              airport: "JFK",
              terminal: "4"
            },
            departureTime: new Date("2025-03-15T08:00:00Z"),
            arrivalTime: new Date("2025-03-15T16:30:00Z"),
            price: 1200,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1002",
            bookingReference: "ABC124",
            flightNumber: "UA456",
            airline: "United Airlines",
            origin: {
              airport: "JFK",
              terminal: "4"
            },
            destination: {
              airport: "SFO",
              terminal: "3"
            },
            departureTime: new Date("2025-03-17T17:00:00Z"),
            arrivalTime: new Date("2025-03-17T20:30:00Z"),
            price: 1200,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1001",
          bookingReference: "HIL789",
          name: "Four Seasons New York",
          location: {
            street: "57 E 57th St",
            city: "New York",
            state: "NY",
            country: "USA",
            postalCode: "10022"
          },
          checkIn: new Date("2025-03-15T15:00:00Z"),
          checkOut: new Date("2025-03-17T12:00:00Z"),
          roomType: "Executive Suite",
          price: 800,
          bookingStatus: "confirmed"
        },
        groundTransport: [
          {
            id: "GT1001",
            type: "uber",
            pickupLocation: {
              street: "SFO International Terminal",
              city: "San Francisco",
              state: "CA",
              country: "USA",
              postalCode: "94128"
            },
            dropoffLocation: {
              street: "57 E 57th St",
              city: "New York",
              state: "NY",
              country: "USA",
              postalCode: "10022"
            },
            estimatedPrice: 85,
            actualPrice: 92,
            status: "completed"
          }
        ],
        perDiem: {
          id: "PD1001",
          dailyRate: 150,
          startDate: new Date("2025-03-15"),
          endDate: new Date("2025-03-17"),
          totalAmount: 300,
          status: "approved",
          expenses: [
            {
              id: "E1001",
              category: "meals",
              amount: 145,
              date: new Date("2025-03-15"),
              receipt: "receipt_url_1",
              status: "approved",
              notes: "Business dinner with clients"
            }
          ]
        },
        created: new Date("2025-02-01T10:00:00Z"),
        modified: new Date("2025-02-15T14:30:00Z"),
        createdBy: "ADMIN_USER_001",
        totalBudget: 4000,
        actualSpend: 3737
      },
    
      // 2. Consultant Short Trip
      {
        id: "T1002",
        guest: {
          id: "G1002",
          firstName: "Mike",
          lastName: "Johnson",
          email: "mike.johnson@consultant.com",
          phone: "+1-312-555-0202",
          dietaryRestrictions: ["vegetarian"]
        },
        guestType: "consulting",
        status: "Completed",
        travelPreferences: {
          id: "TP1002",
          guestType: "consultant",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "LYFT"
          },
          dailyPerDiem: 75
        },
        itinerary: {
          id: "I1002",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-02-20"),
          endDate: new Date("2025-02-21")
        },
        flights: {
          outbound: {
            id: "F1003",
            bookingReference: "DEF456",
            flightNumber: "AS234",
            airline: "Alaska Airlines",
            origin: {
              airport: "ORD",
              terminal: "3"
            },
            destination: {
              airport: "SEA",
              terminal: "N"
            },
            departureTime: new Date("2025-02-20T06:00:00Z"),
            arrivalTime: new Date("2025-02-20T08:45:00Z"),
            price: 350,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1002",
          bookingReference: "MAR456",
          name: "Courtyard Seattle Downtown",
          location: {
            street: "612 2nd Ave",
            city: "Seattle",
            state: "WA",
            country: "USA",
            postalCode: "98104"
          },
          checkIn: new Date("2025-02-20T15:00:00Z"),
          checkOut: new Date("2025-02-21T12:00:00Z"),
          roomType: "Standard King",
          price: 200,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-01-15T09:00:00Z"),
        modified: new Date("2025-01-15T09:00:00Z"),
        createdBy: "ADMIN_USER_002",
        totalBudget: 800,
        actualSpend: 625
      },
    
      // 3. International Conference Attendee
      {
        id: "T1003",
        guest: {
          id: "G1003",
          firstName: "Emma",
          lastName: "Garcia",
          email: "emma.garcia@company.com",
          phone: "+1-650-555-0303",
          nationality: "Spain",
          passportNumber: "XYZ789012",
          passportExpiryDate: new Date("2027-06-30"),
          accessibilityNeeds: ["wheelchair_access"],
          emergencyContact: {
            name: "Carlos Garcia",
            relationship: "Brother",
            phone: "+34-555-0303"
          }
        },
        guestType: "conference",
        status: "Completed",
        travelPreferences: {
          id: "TP1003",
          guestType: "employee",
          flight: {
            cabinClass: "ECONOMY",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 4
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 100
        },
        itinerary: {
          id: "I1003",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-04-10"),
          endDate: new Date("2025-04-15")
        },
        flights: {
          outbound: {
            id: "F1004",
            bookingReference: "GHI789",
            flightNumber: "BA284",
            airline: "British Airways",
            origin: {
              airport: "SFO",
              terminal: "I"
            },
            destination: {
              airport: "LHR",
              terminal: "5"
            },
            departureTime: new Date("2025-04-10T16:15:00Z"),
            arrivalTime: new Date("2025-04-11T10:30:00Z"),
            price: 1800,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1003",
          bookingReference: "HIL101112",
          name: "Hilton London Bankside",
          location: {
            street: "2-8 Great Suffolk Street",
            city: "London",
            country: "UK",
            postalCode: "SE1 0UG"
          },
          checkIn: new Date("2025-04-11T15:00:00Z"),
          checkOut: new Date("2025-04-15T11:00:00Z"),
          roomType: "Accessible King Room",
          price: 1200,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-01-10T11:00:00Z"),
        modified: new Date("2025-02-01T16:45:00Z"),
        createdBy: "ADMIN_USER_003",
        totalBudget: 4500,
        actualSpend: 4100
      },
    
      // 4. New Hire Training Trip
      {
        id: "T1004",
        guest: {
          id: "G1004",
          firstName: "Alex",
          lastName: "Kim",
          email: "alex.kim@company.com",
          phone: "+1-206-555-0404",
          dietaryRestrictions: ["gluten-free"]
        },
        guestType: "training",
        status: "Completed",
        travelPreferences: {
          id: "TP1004",
          guestType: "new_hire",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "LYFT"
          },
          dailyPerDiem: 50
        },
        itinerary: {
          id: "I1004",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-03-01"),
          endDate: new Date("2025-03-05")
        },
        flights: {
          outbound: {
            id: "F1005",
            bookingReference: "JKL012",
            flightNumber: "AA1234",
            airline: "American Airlines",
            origin: {
              airport: "SEA",
              terminal: "N"
            },
            destination: {
              airport: "AUS"
            },
            departureTime: new Date("2025-03-01T08:00:00Z"),
            arrivalTime: new Date("2025-03-01T14:30:00Z"),
            price: 450,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1004",
          bookingReference: "MAR131415",
          name: "Austin Marriott South",
          location: {
            street: "4415 South IH-35",
            city: "Austin",
            state: "TX",
            country: "USA",
            postalCode: "78744"
          },
          checkIn: new Date("2025-03-01T15:00:00Z"),
          checkOut: new Date("2025-03-05T11:00:00Z"),
          roomType: "Double Queen",
          price: 600,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-02-01T13:15:00Z"),
        modified: new Date("2025-02-01T13:15:00Z"),
        createdBy: "ADMIN_USER_004",
        totalBudget: 1500,
        actualSpend: 1250
      },
      {
        id: "T1006",
        guest: {
          id: "G1006",
          firstName: "Maria",
          lastName: "Santos",
          email: "maria.santos@email.com",
          phone: "+351-910-555-0606",
          nationality: "Portugal",
          passportNumber: "PRT123456",
          passportExpiryDate: new Date("2026-08-15"),
          dietaryRestrictions: ["halal"],
          emergencyContact: {
            name: "João Santos",
            relationship: "Spouse",
            phone: "+351-910-555-0607"
          }
        },
        guestType: "interview",
        status: "Completed",
        travelPreferences: {
          id: "TP1006",
          guestType: "candidate",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 4
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 100
        },
        itinerary: {
          id: "I1006",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-04-20"),
          endDate: new Date("2025-04-23")
        },
        flights: {
          outbound: {
            id: "F1006",
            bookingReference: "TAP789",
            flightNumber: "TP456",
            airline: "TAP Air Portugal",
            origin: {
              airport: "LIS",
              terminal: "1"
            },
            destination: {
              airport: "SFO",
              terminal: "I"
            },
            departureTime: new Date("2025-04-20T10:00:00Z"),
            arrivalTime: new Date("2025-04-20T20:30:00Z"),
            price: 2800,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1007",
            bookingReference: "TAP790",
            flightNumber: "TP457",
            airline: "TAP Air Portugal",
            origin: {
              airport: "SFO",
              terminal: "I"
            },
            destination: {
              airport: "LIS",
              terminal: "1"
            },
            departureTime: new Date("2025-04-23T22:00:00Z"),
            arrivalTime: new Date("2025-04-24T16:30:00Z"),
            price: 2800,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1006",
          bookingReference: "SFH123",
          name: "San Francisco Palace Hotel",
          location: {
            street: "2 New Montgomery St",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            postalCode: "94105"
          },
          checkIn: new Date("2025-04-20T16:00:00Z"),
          checkOut: new Date("2025-04-23T11:00:00Z"),
          roomType: "Deluxe King",
          price: 1200,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-03-01T09:00:00Z"),
        modified: new Date("2025-03-15T14:30:00Z"),
        createdBy: "ADMIN_USER_006",
        totalBudget: 8000,
        actualSpend: 7100
      },
    
      // 7. Vendor Meeting in Chicago
      {
        id: "T1007",
        guest: {
          id: "G1007",
          firstName: "Robert",
          lastName: "Lee",
          email: "robert.lee@company.com",
          phone: "+1-650-555-0707",
          loyaltyPrograms: [
            {
              provider: "American Airlines",
              programName: "AAdvantage",
              memberNumber: "AA789012",
              status: "Platinum"
            },
            {
              provider: "Marriott",
              programName: "Bonvoy",
              memberNumber: "MB123456",
              status: "Gold"
            }
          ]
        },
        guestType: "vendor_meeting",
        status: "Completed",
        travelPreferences: {
          id: "TP1007",
          guestType: "procurement",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "LYFT"
          },
          dailyPerDiem: 75
        },
        itinerary: {
          id: "I1007",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-05-05"),
          endDate: new Date("2025-05-06")
        },
        flights: {
          outbound: {
            id: "F1008",
            bookingReference: "AA345",
            flightNumber: "AA1856",
            airline: "American Airlines",
            origin: {
              airport: "SFO",
              terminal: "2"
            },
            destination: {
              airport: "ORD",
              terminal: "3"
            },
            departureTime: new Date("2025-05-05T06:00:00Z"),
            arrivalTime: new Date("2025-05-05T12:15:00Z"),
            price: 450,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1009",
            bookingReference: "AA346",
            flightNumber: "AA1857",
            airline: "American Airlines",
            origin: {
              airport: "ORD",
              terminal: "3"
            },
            destination: {
              airport: "SFO",
              terminal: "2"
            },
            departureTime: new Date("2025-05-06T17:00:00Z"),
            arrivalTime: new Date("2025-05-06T19:45:00Z"),
            price: 450,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1007",
          bookingReference: "MAR789",
          name: "Chicago Marriott Downtown",
          location: {
            street: "540 N Michigan Ave",
            city: "Chicago",
            state: "IL",
            country: "USA",
            postalCode: "60611"
          },
          checkIn: new Date("2025-05-05T15:00:00Z"),
          checkOut: new Date("2025-05-06T12:00:00Z"),
          roomType: "Standard Queen",
          price: 250,
          bookingStatus: "confirmed"
        },
        groundTransport: [
          {
            id: "GT1002",
            type: "lyft",
            pickupLocation: {
              street: "O'Hare International Airport",
              city: "Chicago",
              state: "IL",
              country: "USA",
              postalCode: "60666"
            },
            dropoffLocation: {
              street: "540 N Michigan Ave",
              city: "Chicago",
              state: "IL",
              country: "USA",
              postalCode: "60611"
            },
            estimatedPrice: 45,
            actualPrice: 52,
            status: "completed"
          }
        ],
        created: new Date("2025-04-01T10:00:00Z"),
        modified: new Date("2025-04-01T10:00:00Z"),
        createdBy: "ADMIN_USER_007",
        totalBudget: 1500,
        actualSpend: 1402
      },
    
      // 8. Regional Training Session
      {
        id: "T1008",
        guest: {
          id: "G1008",
          firstName: "Julia",
          lastName: "Martinez",
          email: "julia.martinez@company.com",
          phone: "+1-512-555-0808",
          dietaryRestrictions: ["vegan"],
          accessibilityNeeds: ["hearing_assisted_room"]
        },
        guestType: "training",
        status: "Completed",
        travelPreferences: {
          id: "TP1008",
          guestType: "trainer",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 65
        },
        itinerary: {
          id: "I1008",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-05-15"),
          endDate: new Date("2025-05-17")
        },
        flights: {
          outbound: {
            id: "F1010",
            bookingReference: "SW567",
            flightNumber: "WN1234",
            airline: "Southwest Airlines",
            origin: {
              airport: "AUS"
            },
            destination: {
              airport: "DFW",
              terminal: "E"
            },
            departureTime: new Date("2025-05-15T08:00:00Z"),
            arrivalTime: new Date("2025-05-15T09:15:00Z"),
            price: 200,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1008",
          bookingReference: "HI456",
          name: "Holiday Inn DFW Airport South",
          location: {
            street: "14320 Centre Station Dr",
            city: "Fort Worth",
            state: "TX",
            country: "USA",
            postalCode: "76155"
          },
          checkIn: new Date("2025-05-15T15:00:00Z"),
          checkOut: new Date("2025-05-17T11:00:00Z"),
          roomType: "Accessible King",
          price: 320,
          bookingStatus: "confirmed"
        },
        perDiem: {
          id: "PD1002",
          dailyRate: 65,
          startDate: new Date("2025-05-15"),
          endDate: new Date("2025-05-17"),
          totalAmount: 130,
          status: "approved",
          expenses: [
            {
              id: "E1002",
              category: "meals",
              amount: 55,
              date: new Date("2025-05-15"),
              receipt: "receipt_url_2",
              status: "approved",
              notes: "Dinner at hotel restaurant"
            }
          ]
        },
        created: new Date("2025-04-15T11:30:00Z"),
        modified: new Date("2025-04-15T11:30:00Z"),
        createdBy: "ADMIN_USER_008",
        totalBudget: 800,
        actualSpend: 705
      },
      {
        id: "T1010",
        guest: {
          id: "G1010",
          firstName: "Akiko",
          lastName: "Tanaka",
          email: "akiko.tanaka@company.com",
          phone: "+81-90-1234-5678",
          nationality: "Japan",
          passportNumber: "JP789012",
          passportExpiryDate: new Date("2027-12-31"),
          dietaryRestrictions: ["pescatarian"],
          loyaltyPrograms: [
            {
              provider: "JAL",
              programName: "Mileage Bank",
              memberNumber: "JL567890",
              status: "Sapphire"
            }
          ]
        },
        guestType: "workshop",
        status: "Completed",
        travelPreferences: {
          id: "TP1010",
          guestType: "facilitator",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 4
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 125
        },
        itinerary: {
          id: "I1010",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-07-10"),
          endDate: new Date("2025-07-15")
        },
        flights: {
          outbound: {
            id: "F1013",
            bookingReference: "JL123",
            flightNumber: "JL711",
            airline: "Japan Airlines",
            origin: {
              airport: "NRT",
              terminal: "2"
            },
            destination: {
              airport: "SIN",
              terminal: "3"
            },
            departureTime: new Date("2025-07-10T09:00:00Z"),
            arrivalTime: new Date("2025-07-10T15:30:00Z"),
            price: 2200,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1014",
            bookingReference: "JL124",
            flightNumber: "JL712",
            airline: "Japan Airlines",
            origin: {
              airport: "SIN",
              terminal: "3"
            },
            destination: {
              airport: "NRT",
              terminal: "2"
            },
            departureTime: new Date("2025-07-15T16:30:00Z"),
            arrivalTime: new Date("2025-07-15T23:45:00Z"),
            price: 2200,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1010",
          bookingReference: "MBS789",
          name: "Marina Bay Sands",
          location: {
            street: "10 Bayfront Avenue",
            city: "Singapore",
            country: "Singapore",
            postalCode: "018956"
          },
          checkIn: new Date("2025-07-10T15:00:00Z"),
          checkOut: new Date("2025-07-15T12:00:00Z"),
          roomType: "Premier Room",
          price: 2500,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-05-15T08:00:00Z"),
        modified: new Date("2025-06-01T14:30:00Z"),
        createdBy: "ADMIN_USER_010",
        totalBudget: 8000,
        actualSpend: 7400
      },
    
      // 11. Board Member Visit
      {
        id: "T1011",
        guest: {
          id: "G1011",
          firstName: "Victoria",
          lastName: "Blackwood",
          email: "victoria.blackwood@board.company.com",
          phone: "+44-7700-900123",
          nationality: "UK",
          passportNumber: "GBR456789",
          passportExpiryDate: new Date("2028-03-15"),
          dietaryRestrictions: ["dairy-free"],
          loyaltyPrograms: [
            {
              provider: "British Airways",
              programName: "Executive Club",
              memberNumber: "BA234567",
              status: "Gold"
            }
          ]
        },
        guestType: "board_meeting",
        status: "Completed",
        travelPreferences: {
          id: "TP1011",
          guestType: "board_member",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: true
          },
          hotel: {
            minimumRating: 5
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 200
        },
        itinerary: {
          id: "I1011",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-08-01"),
          endDate: new Date("2025-08-03")
        },
        flights: {
          outbound: {
            id: "F1015",
            bookingReference: "BA456",
            flightNumber: "BA287",
            airline: "British Airways",
            origin: {
              airport: "LHR",
              terminal: "5"
            },
            destination: {
              airport: "SFO",
              terminal: "I"
            },
            departureTime: new Date("2025-08-01T10:30:00Z"),
            arrivalTime: new Date("2025-08-01T13:45:00Z"),
            price: 8500,
            bookingStatus: "confirmed"
          },
          return: {
            id: "F1016",
            bookingReference: "BA457",
            flightNumber: "BA286",
            airline: "British Airways",
            origin: {
              airport: "SFO",
              terminal: "I"
            },
            destination: {
              airport: "LHR",
              terminal: "5"
            },
            departureTime: new Date("2025-08-03T16:15:00Z"),
            arrivalTime: new Date("2025-08-04T10:30:00Z"),
            price: 8500,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1011",
          bookingReference: "RCH123",
          name: "Ritz-Carlton San Francisco",
          location: {
            street: "600 Stockton St",
            city: "San Francisco",
            state: "CA",
            country: "USA",
            postalCode: "94108"
          },
          checkIn: new Date("2025-08-01T15:00:00Z"),
          checkOut: new Date("2025-08-03T12:00:00Z"),
          roomType: "Presidential Suite",
          price: 3500,
          bookingStatus: "confirmed"
        },
        groundTransport: [
          {
            id: "GT1004",
            type: "uber",
            voucherID: "UV789",
            pickupLocation: {
              street: "San Francisco International Airport",
              city: "San Francisco",
              state: "CA",
              country: "USA",
              postalCode: "94128"
            },
            dropoffLocation: {
              street: "600 Stockton St",
              city: "San Francisco",
              state: "CA",
              country: "USA",
              postalCode: "94108"
            },
            estimatedPrice: 120,
            actualPrice: 135,
            status: "completed"
          }
        ],
        created: new Date("2025-06-15T09:00:00Z"),
        modified: new Date("2025-07-01T16:45:00Z"),
        createdBy: "ADMIN_USER_011",
        totalBudget: 22000,
        actualSpend: 21035
      },
    
      // 12. Sales Kickoff Attendee
      {
        id: "T1012",
        guest: {
          id: "G1012",
          firstName: "Marcus",
          lastName: "Rodriguez",
          email: "marcus.rodriguez@company.com",
          phone: "+1-305-555-0101",
          dietaryRestrictions: ["none"],
          loyaltyPrograms: [
            {
              provider: "Delta",
              programName: "SkyMiles",
              memberNumber: "DL901234",
              status: "Silver"
            }
          ]
        },
        guestType: "sales_kickoff",
        status: "Completed",
        travelPreferences: {
          id: "TP1012",
          guestType: "sales_rep",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 4
          },
          groundTransport: {
            preferredServices: "LYFT"
          },
          dailyPerDiem: 75
        },
        itinerary: {
          id: "I1012",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-09-15"),
          endDate: new Date("2025-09-19")
        },
        flights: {
          outbound: {
            id: "F1017",
            bookingReference: "DL789",
            flightNumber: "DL1234",
            airline: "Delta Airlines",
            origin: {
              airport: "MIA",
              terminal: "S"
            },
            destination: {
              airport: "LAS",
              terminal: "1"
            },
            departureTime: new Date("2025-09-15T07:00:00Z"),
            arrivalTime: new Date("2025-09-15T09:45:00Z"),
            price: 450,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1012",
          bookingReference: "BLG456",
          name: "Bellagio Las Vegas",
          location: {
            street: "3600 S Las Vegas Blvd",
            city: "Las Vegas",
            state: "NV",
            country: "USA",
            postalCode: "89109"
          },
          checkIn: new Date("2025-09-15T16:00:00Z"),
          checkOut: new Date("2025-09-19T11:00:00Z"),
          roomType: "Fountain View King",
          price: 1200,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-07-01T10:30:00Z"),
        modified: new Date("2025-07-15T13:45:00Z"),
        createdBy: "ADMIN_USER_012",
        totalBudget: 2500,
        actualSpend: 2100
      },
    
      // 13. Remote Employee Onboarding
      {
        id: "T1013",
        guest: {
          id: "G1013",
          firstName: "Sophie",
          lastName: "Anderson",
          email: "sophie.anderson@company.com",
          phone: "+1-208-555-0202",
          dietaryRestrictions: ["vegetarian"],
          emergencyContact: {
            name: "James Anderson",
            relationship: "Father",
            phone: "+1-208-555-0203"
          }
        },
        guestType: "onboarding",
        status: "Completed",
        travelPreferences: {
          id: "TP1013",
          guestType: "new_hire",
          flight: {
            cabinClass: "BUSINESS",
            maxStops: "DIRECT",
            refundableTicket: false
          },
          hotel: {
            minimumRating: 3
          },
          groundTransport: {
            preferredServices: "UBER"
          },
          dailyPerDiem: 60
        },
        itinerary: {
          id: "I1013",
          origin:{
            city: {
              name: "SFO"
            }
          },
          destination: {
            city: {
              name: "NYC"
            }
          },
          startDate: new Date("2025-10-01"),
          endDate: new Date("2025-10-05")
        },
        flights: {
          outbound: {
            id: "F1018",
            bookingReference: "AS234",
            flightNumber: "AS2345",
            airline: "Alaska Airlines",
            origin: {
              airport: "BOI"
            },
            destination: {
              airport: "SEA",
              terminal: "N"
            },
            departureTime: new Date("2025-10-01T08:00:00Z"),
            arrivalTime: new Date("2025-10-01T09:15:00Z"),
            price: 300,
            bookingStatus: "confirmed"
          }
        },
        hotel: {
          id: "H1013",
          bookingReference: "WES789",
          name: "Westin Seattle",
          location: {
            street: "1900 5th Ave",
            city: "Seattle",
            state: "WA",
            country: "USA",
            postalCode: "98101"
          },
          checkIn: new Date("2025-10-01T16:00:00Z"),
          checkOut: new Date("2025-10-05T11:00:00Z"),
          roomType: "Traditional Room",
          price: 800,
          bookingStatus: "confirmed"
        },
        created: new Date("2025-08-15T11:30:00Z"),
        modified: new Date("2025-08-15T11:30:00Z"),
        createdBy: "ADMIN_USER_013",
        totalBudget: 1500,
        actualSpend: 1300
      },
  ]
}   