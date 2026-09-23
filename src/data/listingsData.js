export const LISTINGS_DATA = [
  {
    id: "prop-01",
    mlsNumber: "EV-90210-01",
    slug: "the-bel-air-promontory",
    title: "The Bel Air Promontory",
    subtitle: "A masterwork of glass, travertine, and seamless horizon views",
    price: 18750000,
    originalPrice: 19500000,
    status: "exclusive", // exclusive, active, pending, sold
    propertyType: "estate", // estate, single_family, penthouse, contemporary
    featured: true,
    specs: {
      beds: 6,
      baths: 8,
      halfBaths: 2,
      sqft: 11450,
      lotSizeAcres: 1.85,
      yearBuilt: 2024,
      garageSpaces: 4,
      hoaMonthly: 1250,
      annualTaxes: 185000,
      pricePerSqft: 1637,
      architect: "Olson Kundig Associates"
    },
    location: {
      address: "10771 Bellagio Road",
      city: "Los Angeles",
      state: "CA",
      zip: "90077",
      neighborhoodId: "bel-air",
      neighborhoodName: "Bel Air",
      coordinates: { lat: 34.0837, lng: -118.4487 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42502-large.mp4",
      has360Tour: true
    },
    description: "Commanding one of Bel Air’s most coveted promontories, this architectural triumph balances monolithic travertine forms with floor-to-ceiling automated glass walls that vanish into the Los Angeles skyline. Conceived for world-class entertaining, the residence unfolds across three terraced levels, featuring a 90-foot cantilevered infinity pool, dual primary suites with private garden atriums, a temperature-controlled 1,200-bottle wine cellar, and a zero-edge screening lounge.",
    amenities: [
      "90ft Cantilevered Infinity Pool",
      "Sub-Zero & Gaggenau Chef Kitchen",
      "1,200-Bottle Climate Wine Cellar",
      "12-Seat Dolby Atmos Screening Room",
      "Wellness Spa & Cedar Sauna",
      "Private Gated Motor Court",
      "Smart Home Automation (Lutron/Crestron)",
      "Dedicated Staff Quarters"
    ],
    floors: [
      {
        level: "Level 1 — Main Living & Pool Deck",
        sqft: 5200,
        rooms: ["Great Room", "Chef Kitchen", "Dining Pavilion", "Infinity Pool Deck", "Wine Room"],
        hotspots: [
          { name: "Infinity Pool & Horizon Lounge", x: 75, y: 35 },
          { name: "Travertine Fireplace Lounge", x: 45, y: 55 },
          { name: "Bespoke Culinary Kitchen", x: 25, y: 65 }
        ]
      },
      {
        level: "Level 2 — Primary Suites & Terraces",
        sqft: 4100,
        rooms: ["Dual Primary Suites", "Private Spa Baths", "Wraparound Terraces", "Executive Library"],
        hotspots: [
          { name: "Master Horizon Suite", x: 68, y: 40 },
          { name: "Marble En-Suite Bath", x: 30, y: 50 }
        ]
      },
      {
        level: "Sub-Level — Entertainment & Spa",
        sqft: 2150,
        rooms: ["Cinema Room", "Finnish Sauna & Cold Plunge", "Gymnasium", "Staff Suite"],
        hotspots: [
          { name: "Dolby Atmos Cinema", x: 50, y: 45 },
          { name: "Wellness Suite", x: 20, y: 70 }
        ]
      }
    ],
    agentId: "agent-01",
    priceHistory: [
      { date: "Oct 2024", price: 19500000, event: "Listed" },
      { date: "Jan 2025", price: 18750000, event: "Price Adjustment" }
    ]
  },
  {
    id: "prop-02",
    mlsNumber: "EV-90210-02",
    slug: "villa-san-marino-tribeca",
    title: "The Penthouse at 45 Crosby",
    subtitle: "A cast-iron loft penthouse with private landscaped rooftop oasis",
    price: 14200000,
    originalPrice: 14200000,
    status: "active",
    propertyType: "penthouse",
    featured: true,
    specs: {
      beds: 4,
      baths: 4,
      halfBaths: 1,
      sqft: 6800,
      lotSizeAcres: 0.15,
      yearBuilt: 2021,
      garageSpaces: 2,
      hoaMonthly: 3800,
      annualTaxes: 142000,
      pricePerSqft: 2088,
      architect: "Annabelle Selldorf"
    },
    location: {
      address: "45 Crosby Street, PH",
      city: "New York",
      state: "NY",
      zip: "10012",
      neighborhoodId: "soho-tribeca",
      neighborhoodName: "SoHo / TriBeCa",
      coordinates: { lat: 40.7223, lng: -73.9984 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1502005229762-ee1b2b8ab98f?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-panoramic-view-42504-large.mp4",
      has360Tour: true
    },
    description: "Perched atop one of SoHo's premier cast-iron landmarks, this duplex penthouse is a museum-caliber sanctuary. Soaring 14-foot timber-beamed ceilings, original exposed brick, and bespoke blackened steel finishes frame luminous southern light. A custom sculptural bronze staircase rises to a 2,400 sqft landscaped private rooftop with an outdoor plunge pool, outdoor kitchen, and 360-degree city views.",
    amenities: [
      "2,400 sqft Landscaped Roof Terrace",
      "Private Keyed Elevator Access",
      "Calacatta Paonazzo Marble Kitchen",
      "Custom Plunge Pool & Outdoor Shower",
      "Wood-Burning Fireplace",
      "24-Hour Attended Lobby & Concierge",
      "Private Deeded Storage Room"
    ],
    floors: [
      {
        level: "Lower Level — Grand Salon & Suites",
        sqft: 4400,
        rooms: ["Corner Salon", "Formal Dining", "Custom Kitchen", "3 Guest Suites"],
        hotspots: [
          { name: "Cast Iron Fireplace Salon", x: 40, y: 40 },
          { name: "Chef's Scullery", x: 70, y: 60 }
        ]
      },
      {
        level: "Upper Level — Primary Sanctuary & Roof",
        sqft: 2400,
        rooms: ["Primary Suite", "Dressing Gallery", "Rooftop Plunge Pool", "Outdoor Kitchen"],
        hotspots: [
          { name: "Rooftop Plunge Pool", x: 80, y: 30 },
          { name: "Primary Terrace Suite", x: 35, y: 55 }
        ]
      }
    ],
    agentId: "agent-02",
    priceHistory: [
      { date: "Nov 2024", price: 14200000, event: "Listed" }
    ]
  },
  {
    id: "prop-03",
    mlsNumber: "EV-33139-03",
    slug: "the-venetian-waterfront-sanctuary",
    title: "The Venetian Island Sanctuary",
    subtitle: "Modern tropical waterfront estate with 100ft prime deep-water dockage",
    price: 24500000,
    originalPrice: 26000000,
    status: "active",
    propertyType: "waterfront",
    featured: true,
    specs: {
      beds: 7,
      baths: 8,
      halfBaths: 1,
      sqft: 9850,
      lotSizeAcres: 0.42,
      yearBuilt: 2023,
      garageSpaces: 3,
      hoaMonthly: 600,
      annualTaxes: 215000,
      pricePerSqft: 2487,
      architect: "SAOTA Architecture"
    },
    location: {
      address: "212 Rivo Alto Drive",
      city: "Miami Beach",
      state: "FL",
      zip: "33139",
      neighborhoodId: "venetian-islands",
      neighborhoodName: "Venetian Islands",
      coordinates: { lat: 25.7907, lng: -80.1558 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42502-large.mp4",
      has360Tour: true
    },
    description: "A showpiece of tropical modernism nestled along Biscayne Bay with wide open sunset vistas over the downtown Miami skyline. Designed by SAOTA, this estate features organic stone walls, rich teak millwork, and expansive reflective ponds leading out to an infinity-edge bayfront swimming pool and a 100-foot private yacht dock.",
    amenities: [
      "100ft Private Deep-Water Yacht Dock",
      "Wide Open Downtown Sunset Views",
      "Reflective Water Courtyard",
      "Bespoke Italian Boffi Kitchen",
      "Rooftop Sunset Lounge with Jacuzzi",
      "Integrated Tesla Solar & Powerwall Backup",
      "Security Gate with Perimeter Sensors"
    ],
    floors: [
      {
        level: "Level 1 — Bayfront Great Room & Pool",
        sqft: 5500,
        rooms: ["Open Concept Living", "Chef Kitchen", "Covered Lanai", "Guest Suite", "Yacht Deck"],
        hotspots: [
          { name: "Infinity Bay Pool", x: 80, y: 35 },
          { name: "Waterfront Lanai", x: 55, y: 50 }
        ]
      },
      {
        level: "Level 2 — Primary Retreat & Family Suites",
        sqft: 4350,
        rooms: ["Bayfront Primary Suite", "4 Guest En-Suites", "Family Media Lounge"],
        hotspots: [
          { name: "Sunset Master Suite", x: 70, y: 40 },
          { name: "Executive Suite Terrace", x: 30, y: 60 }
        ]
      }
    ],
    agentId: "agent-03",
    priceHistory: [
      { date: "Aug 2024", price: 26000000, event: "Listed" },
      { date: "Dec 2024", price: 24500000, event: "Price Improvement" }
    ]
  },
  {
    id: "prop-04",
    mlsNumber: "EV-94115-04",
    slug: "pacific-heights-heritage-manor",
    title: "Pacific Heights Grand Georgian",
    subtitle: "Restored 1912 architectural heritage home with Golden Gate Bridge panoramas",
    price: 16900000,
    originalPrice: 16900000,
    status: "pending",
    propertyType: "single_family",
    featured: true,
    specs: {
      beds: 5,
      baths: 6,
      halfBaths: 1,
      sqft: 7900,
      lotSizeAcres: 0.28,
      yearBuilt: 1912,
      garageSpaces: 3,
      hoaMonthly: 0,
      annualTaxes: 168000,
      pricePerSqft: 2139,
      architect: "Willis Polk (Original) / Butler Armsden (Renovation)"
    },
    location: {
      address: "2840 Broadway Street",
      city: "San Francisco",
      state: "CA",
      zip: "94115",
      neighborhoodId: "pacific-heights",
      neighborhoodName: "Pacific Heights",
      coordinates: { lat: 37.7946, lng: -122.4411 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42502-large.mp4",
      has360Tour: false
    },
    description: "Exemplifying San Francisco's Gold Coast legacy, this Willis Polk Georgian masterpiece has been restored to perfection. Soaring ceilings with authentic crown plasterwork meet bespoke minimalist fixtures, chevron French oak flooring, and uninterrupted views across the San Francisco Bay, Alcatraz, and the Golden Gate Bridge.",
    amenities: [
      "Golden Gate & Bay Horizon Views",
      "Herringbone French White Oak Floors",
      "Temperature Controlled Wine Vault",
      "Private Formal Garden & Courtyard",
      "Elevator Serving All 4 Levels",
      "3-Car Garage with EV Chargers"
    ],
    floors: [
      {
        level: "Level 1 — Entry & Formal Parlor",
        sqft: 2200,
        rooms: ["Formal Entry", "Grand Parlor", "Dining Room", "Kitchen"],
        hotspots: [{ name: "Grand Foyer", x: 45, y: 50 }]
      },
      {
        level: "Level 2 — Primary View Suites",
        sqft: 2400,
        rooms: ["Primary Bay View Suite", "2 En-Suite Bedrooms"],
        hotspots: [{ name: "Bridge View Balcony", x: 75, y: 35 }]
      }
    ],
    agentId: "agent-01",
    priceHistory: [
      { date: "Dec 2024", price: 16900000, event: "Listed" },
      { date: "Jan 2025", price: 16900000, event: "Pending Offer" }
    ]
  },
  {
    id: "prop-05",
    mlsNumber: "EV-81611-05",
    slug: "aspen-red-mountain-chalet",
    title: "Red Mountain Alpine Lodge",
    subtitle: "Modern glass & cedar ski-in/ski-out estate with direct Ajax Mountain views",
    price: 32000000,
    originalPrice: 32000000,
    status: "exclusive",
    propertyType: "estate",
    featured: true,
    specs: {
      beds: 6,
      baths: 9,
      halfBaths: 2,
      sqft: 12800,
      lotSizeAcres: 3.4,
      yearBuilt: 2024,
      garageSpaces: 4,
      hoaMonthly: 900,
      annualTaxes: 290000,
      pricePerSqft: 2500,
      architect: "Charles Cunniffe Architects"
    },
    location: {
      address: "710 Willoughby Way",
      city: "Aspen",
      state: "CO",
      zip: "81611",
      neighborhoodId: "red-mountain-aspen",
      neighborhoodName: "Red Mountain",
      coordinates: { lat: 39.1995, lng: -106.8175 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42502-large.mp4",
      has360Tour: true
    },
    description: "Known locally as 'Billionaire's Mountain', this newly finished masterpiece provides unmatched views of Aspen Mountain and the Roaring Fork Valley. Featuring hand-hewn cedar beams, monumental Colorado buff sandstone, heated outdoor infinity hot tubs, oxygen-enriched primary suites, and a private ski locker with direct slope access.",
    amenities: [
      "Direct Ski-In / Ski-Out Access",
      "Heated Stone Driveway & Motor Court",
      "Oxygen-Enriched Primary Suites",
      "Indoor-Outdoor Heated Hydrotherapy Pool",
      "Commercial-Grade Ski Preparation Room",
      "Custom Copper Fire Pit Pavilion"
    ],
    floors: [
      {
        level: "Main Level — Great Room & Terrace",
        sqft: 6000,
        rooms: ["Double-Height Great Room", "Kitchen", "Heated Terrace"],
        hotspots: [{ name: "Sandstone Fireplace", x: 50, y: 50 }]
      }
    ],
    agentId: "agent-02",
    priceHistory: [
      { date: "Jan 2025", price: 32000000, event: "Listed" }
    ]
  },
  {
    id: "prop-06",
    mlsNumber: "EV-78701-06",
    slug: "austin-lakefront-contemporary",
    title: "Lake Austin Glass Compound",
    subtitle: "Organic contemporary lakefront living with 2-story private boat pavilion",
    price: 9750000,
    originalPrice: 9750000,
    status: "active",
    propertyType: "waterfront",
    featured: false,
    specs: {
      beds: 5,
      baths: 6,
      halfBaths: 1,
      sqft: 6200,
      lotSizeAcres: 1.1,
      yearBuilt: 2022,
      garageSpaces: 3,
      hoaMonthly: 350,
      annualTaxes: 110000,
      pricePerSqft: 1572,
      architect: "Miro Rivera Architects"
    },
    location: {
      address: "3400 Westlake Drive",
      city: "Austin",
      state: "TX",
      zip: "78746",
      neighborhoodId: "westlake-austin",
      neighborhoodName: "Westlake Hills",
      coordinates: { lat: 30.3128, lng: -97.7885 }
    },
    media: {
      featuredImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85"
      ],
      videoTourUrl: "https://assets.mixkit.co/videos/preview/mixkit-modern-luxury-house-exterior-and-pool-42502-large.mp4",
      has360Tour: false
    },
    description: "Sculpted into the limestone hills of Lake Austin, this architectural retreat offers seamless indoor-outdoor living surrounded by heritage live oaks. Complete with a two-story boat dock with upper party deck, negative-edge pool overlooking the water, and detached private guest casita.",
    amenities: [
      "2-Story Private Boat Slip & Lift",
      "Negative-Edge Swimming Pool",
      "Detached 1-Bedroom Guest Casita",
      "Outdoor Kitchen & Smoker Station",
      "Solar & Geothermal HVAC Integration"
    ],
    floors: [
      {
        level: "Main Residence",
        sqft: 5000,
        rooms: ["Living", "Dining", "4 Bedrooms", "Outdoor Kitchen"],
        hotspots: [{ name: "Lakeside Deck", x: 80, y: 40 }]
      }
    ],
    agentId: "agent-03",
    priceHistory: [{ date: "Nov 2024", price: 9750000, event: "Listed" }]
  }
];
