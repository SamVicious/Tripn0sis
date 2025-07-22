"use client";

import { useState } from "react";
import Link from "next/link";

interface Landmark {
  id: string;
  name: string;
  description: string;
  category: 'iconic' | 'cultural' | 'nature' | 'historic';
  location: string;
  openingHours: string;
  admissionFee: string;
  estimatedVisitTime: string;
  highlights: string[];
  nearbyHotels: Hotel[];
  localTips: string;
  accessibility: string;
  imageAlt: string;
}

interface Hotel {
  name: string;
  rating: number;
  priceRange: string;
  distance: string;
  amenities: string[];
}

export default function LandmarksPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLandmark, setSelectedLandmark] = useState<Landmark | null>(null);

  const landmarks: Landmark[] = [
    {
      id: '1',
      name: 'Sydney Opera House',
      description: 'World-renowned performing arts venue and architectural masterpiece, a UNESCO World Heritage Site.',
      category: 'iconic',
      location: 'Bennelong Point, Sydney',
      openingHours: 'Tours: 9:00 AM - 5:00 PM daily',
      admissionFee: 'Exterior viewing: Free | Guided tours: $43 | Performances: Varies',
      estimatedVisitTime: '1-3 hours',
      highlights: [
        'Iconic shell-shaped architecture',
        'Concert Hall with world-class acoustics',
        'Joan Sutherland Theatre',
        'Harbour views from the forecourt',
        'Guided architecture tours'
      ],
      nearbyHotels: [
        {
          name: 'Park Hyatt Sydney',
          rating: 5,
          priceRange: '$800-1200/night',
          distance: '0.3km',
          amenities: ['Harbour views', 'Spa', 'Fine dining', 'Pool']
        },
        {
          name: 'Pullman Quay Grand Sydney Harbour',
          rating: 5,
          priceRange: '$400-600/night',
          distance: '0.5km',
          amenities: ['Harbour views', 'Restaurant', 'Gym', 'Business center']
        },
        {
          name: 'Shangri-La Hotel Sydney',
          rating: 5,
          priceRange: '$500-800/night',
          distance: '0.8km',
          amenities: ['Harbour views', 'Spa', 'Multiple restaurants', 'Pool']
        }
      ],
      localTips: 'Book performance tickets well in advance. Free outdoor concerts happen regularly. The best photos are from Mrs Macquarie\'s Chair at sunrise.',
      accessibility: 'Wheelchair accessible with lifts and ramps. Audio tours available.',
      imageAlt: 'Sydney Opera House with harbour bridge in background'
    },
    {
      id: '2',
      name: 'Sydney Harbour Bridge',
      description: 'Iconic steel arch bridge connecting Sydney CBD with North Shore, offering spectacular harbour views.',
      category: 'iconic',
      location: 'Sydney Harbour, connecting CBD to North Shore',
      openingHours: 'Pedestrian walkway: 24/7 | BridgeClimb: Various times',
      admissionFee: 'Walking: Free | BridgeClimb: $174-$388',
      estimatedVisitTime: '1-4 hours',
      highlights: [
        'Pedestrian walkway with harbour views',
        'BridgeClimb experience to the summit',
        'Pylon Lookout museum',
        'Historic engineering marvel',
        'New Year\'s Eve fireworks vantage point'
      ],
      nearbyHotels: [
        {
          name: 'The Langham, Sydney',
          rating: 5,
          priceRange: '$400-700/night',
          distance: '1.2km',
          amenities: ['Spa', 'Pool', 'Fine dining', 'Observatory Bar']
        },
        {
          name: 'Four Seasons Hotel Sydney',
          rating: 5,
          priceRange: '$500-900/night',
          distance: '1.0km',
          amenities: ['Harbour views', 'Spa', 'Restaurant', 'Gym']
        }
      ],
      localTips: 'Walk across for free during the day. Sunrise and sunset offer the best lighting. Book BridgeClimb in advance for special occasions.',
      accessibility: 'Pedestrian walkway is accessible. BridgeClimb has age and health restrictions.',
      imageAlt: 'Sydney Harbour Bridge spanning across the harbour'
    },
    {
      id: '3',
      name: 'Royal Botanic Gardens',
      description: 'Historic botanical gardens featuring native and exotic plants with stunning harbour views.',
      category: 'nature',
      location: 'Mrs Macquaries Road, Sydney',
      openingHours: '7:00 AM - sunset daily',
      admissionFee: 'Free entry | Guided tours: $35',
      estimatedVisitTime: '2-4 hours',
      highlights: [
        'Mrs Macquarie\'s Chair viewpoint',
        'Tropical Centre conservatories',
        'Aboriginal Heritage Tour',
        'Rose Garden and Herb Garden',
        'Flying fox colony at sunset'
      ],
      nearbyHotels: [
        {
          name: 'InterContinental Sydney',
          rating: 5,
          priceRange: '$350-550/night',
          distance: '0.8km',
          amenities: ['Harbour views', 'Pool', 'Spa', 'Multiple restaurants']
        },
        {
          name: 'The Westin Sydney',
          rating: 5,
          priceRange: '$300-500/night',
          distance: '1.0km',
          amenities: ['Central location', 'Gym', 'Restaurant', 'Business center']
        }
      ],
      localTips: 'Visit at sunset to see the flying foxes. Free WiFi throughout. Perfect for picnics with harbour views.',
      accessibility: 'Most paths are wheelchair accessible. Mobility scooters available for hire.',
      imageAlt: 'Lush gardens with Sydney Opera House visible in background'
    },
    {
      id: '4',
      name: 'The Rocks',
      description: 'Historic area with cobblestone streets, weekend markets, galleries, and traditional pubs.',
      category: 'historic',
      location: 'The Rocks, Sydney',
      openingHours: 'Area: 24/7 | Markets: Sat-Sun 10:00 AM - 5:00 PM',
      admissionFee: 'Free to explore | Individual attractions vary',
      estimatedVisitTime: '3-5 hours',
      highlights: [
        'Weekend markets with local crafts',
        'Historic sandstone buildings',
        'Sydney Harbour Bridge views',
        'Traditional Australian pubs',
        'Aboriginal Dreaming tours'
      ],
      nearbyHotels: [
        {
          name: 'Harbour Rocks Hotel Sydney',
          rating: 4,
          priceRange: '$200-350/night',
          distance: '0.1km',
          amenities: ['Historic building', 'Restaurant', 'Bar', 'Central location']
        },
        {
          name: 'The Russell Hotel',
          rating: 4,
          priceRange: '$180-280/night',
          distance: '0.2km',
          amenities: ['Boutique hotel', 'Rooftop garden', 'Historic charm']
        }
      ],
      localTips: 'Visit on weekends for the markets. Try the historic pubs like The Hero of Waterloo. Free walking tours available.',
      accessibility: 'Cobblestone streets can be challenging. Most shops and restaurants are accessible.',
      imageAlt: 'Historic cobblestone streets with sandstone buildings'
    },
    {
      id: '5',
      name: 'Vic in the Park',
      description: 'A popular pub known for its lively atmosphere and great selection of drinks.',
      category: 'pub',
      location: '123 Park Street, Sydney',
      openingHours: 'Mon-Sun: 12:00 PM - 12:00 AM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Lively atmosphere',
        'Great selection of drinks',
        'Live music on weekends'
      ],
      nearbyHotels: [],
      localTips: 'Try the signature cocktails and enjoy the live bands on Friday nights.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Vic in the Park pub exterior'
    },
    {
      id: '6',
      name: 'Mumu',
      description: 'A cozy restaurant offering a variety of local and international dishes.',
      category: 'restaurant',
      location: '45 King Street, Newtown',
      openingHours: 'Tue-Sun: 11:00 AM - 10:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Cozy ambiance',
        'Diverse menu',
        'Friendly staff'
      ],
      nearbyHotels: [],
      localTips: 'Reservations recommended on weekends.',
      accessibility: 'Accessible seating available.',
      imageAlt: 'Mumu restaurant interior'
    },
    {
      id: '7',
      name: 'Yochi',
      description: 'A popular yogurt shop known for its fresh and healthy options.',
      category: 'restaurant',
      location: '78 Newtown Road, Newtown',
      openingHours: 'Mon-Sun: 9:00 AM - 9:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '30 mins - 1 hour',
      highlights: [
        'Fresh yogurt options',
        'Healthy toppings',
        'Friendly service'
      ],
      nearbyHotels: [],
      localTips: 'Try the seasonal flavors.',
      accessibility: 'Wheelchair accessible.',
      imageAlt: 'Yochi yogurt shop interior'
    },
    {
      id: '8',
      name: 'Keg and Brew',
      description: 'A lively pub with a great selection of craft beers and pub food.',
      category: 'pub',
      location: '22 Brew Street, Sydney',
      openingHours: 'Mon-Sun: 11:00 AM - 11:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Craft beers',
        'Pub food',
        'Sports on TV'
      ],
      nearbyHotels: [],
      localTips: 'Happy hour specials on weekdays.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Keg and Brew pub interior'
    },
    {
      id: '9',
      name: 'Totties',
      description: 'A charming restaurant offering homemade meals and desserts.',
      category: 'restaurant',
      location: '15 Tottie Lane, Sydney',
      openingHours: 'Wed-Sun: 12:00 PM - 9:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Homemade meals',
        'Delicious desserts',
        'Cozy atmosphere'
      ],
      nearbyHotels: [],
      localTips: 'Try the daily specials.',
      accessibility: 'Accessible seating available.',
      imageAlt: 'Totties restaurant interior'
    },
    {
      id: '10',
      name: 'Three Sisters Mountain',
      description: 'A famous natural landmark with stunning views and hiking trails.',
      category: 'nature',
      location: 'Blue Mountains, NSW',
      openingHours: 'Open 24 hours',
      admissionFee: 'Free entry',
      estimatedVisitTime: '3-5 hours',
      highlights: [
        'Scenic views',
        'Hiking trails',
        'Picnic areas'
      ],
      nearbyHotels: [],
      localTips: 'Best visited early morning or late afternoon.',
      accessibility: 'Some trails may be challenging for mobility impaired visitors.',
      imageAlt: 'Three Sisters Mountain scenic view'
    },
    {
      id: '11',
      name: 'Monty Christo Haunted House',
      description: 'A spooky iconic haunted house attraction with thrilling experiences.',
      category: 'iconic',
      location: '13 Ghost Lane, Sydney',
      openingHours: 'Fri-Sun: 6:00 PM - 11:00 PM',
      admissionFee: '$15',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Haunted house tours',
        'Spooky decorations',
        'Thrilling experiences'
      ],
      nearbyHotels: [],
      localTips: 'Not recommended for young children.',
      accessibility: 'Not wheelchair accessible.',
      imageAlt: 'Monty Christo Haunted House exterior'
    },
    {
      id: '12',
      name: 'Camperdown Cemetery',
      description: 'A historic cemetery with notable graves and peaceful surroundings.',
      category: 'cultural',
      location: 'Camperdown, Sydney',
      openingHours: 'Sunrise to sunset',
      admissionFee: 'Free entry',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Historic graves',
        'Peaceful walking paths',
        'Guided tours available'
      ],
      nearbyHotels: [],
      localTips: 'Respectful behavior is expected.',
      accessibility: 'Mostly accessible paths.',
      imageAlt: 'Camperdown Cemetery entrance'
    },
    {
      id: '13',
      name: 'Soda Factory',
      description: 'A retro vibes bar with classic cocktails and live music.',
      category: 'retro vibes',
      location: '99 Retro Street, Sydney',
      openingHours: 'Thu-Sat: 6:00 PM - 2:00 AM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Classic cocktails',
        'Live music',
        'Retro decor'
      ],
      nearbyHotels: [],
      localTips: 'Great for late night outings.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Soda Factory bar interior'
    },
    {
      id: '14',
      name: 'Freshwater Beach',
      description: 'A beautiful beach with clear waters and sandy shores.',
      category: 'nature',
      location: 'Freshwater, NSW',
      openingHours: 'Open 24 hours',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-4 hours',
      highlights: [
        'Clear waters',
        'Sandy shores',
        'Surfing spots'
      ],
      nearbyHotels: [],
      localTips: 'Best visited early morning.',
      accessibility: 'Beach access ramps available.',
      imageAlt: 'Freshwater Beach scenic view'
    },
    {
      id: '15',
      name: 'Blue Water High',
      description: 'A popular surfing spot with great waves and beachside cafes.',
      category: 'nature',
      location: 'Manly, NSW',
      openingHours: 'Open 24 hours',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Surfing spots',
        'Beachside cafes',
        'Scenic views'
      ],
      nearbyHotels: [],
      localTips: 'Surf lessons available.',
      accessibility: 'Beach access ramps available.',
      imageAlt: 'Blue Water High surfing spot'
    },
    {
      id: '16',
      name: 'Burwood Nightmarket',
      description: 'A vibrant night market with food stalls, crafts, and live entertainment.',
      category: 'iconic',
      location: 'Burwood, Sydney',
      openingHours: 'Fri-Sun: 5:00 PM - 11:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-4 hours',
      highlights: [
        'Food stalls',
        'Crafts and souvenirs',
        'Live entertainment'
      ],
      nearbyHotels: [],
      localTips: 'Try the street food specialties.',
      accessibility: 'Mostly accessible.',
      imageAlt: 'Burwood Nightmarket stalls'
    },
    {
      id: '17',
      name: 'Bookstore Coffee Shop Glebe',
      description: 'A cozy bookstore and coffee shop with a great selection of books and beverages.',
      category: 'book shop',
      location: 'Glebe, Sydney',
      openingHours: 'Mon-Sat: 8:00 AM - 8:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Wide book selection',
        'Specialty coffee',
        'Reading nooks'
      ],
      nearbyHotels: [],
      localTips: 'Perfect for book lovers and coffee enthusiasts.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Bookstore Coffee Shop Glebe interior'
    },
    {
      id: '18',
      name: 'Goros',
      description: 'A popular pub known for its craft beers and friendly atmosphere.',
      category: 'pub',
      location: '55 Beer Lane, Sydney',
      openingHours: 'Mon-Sun: 12:00 PM - 12:00 AM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Craft beers',
        'Friendly atmosphere',
        'Live music on weekends'
      ],
      nearbyHotels: [],
      localTips: 'Try the seasonal brews.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Goros pub interior'
    },
    {
      id: '19',
      name: 'Grifters Brewery',
      description: 'A craft brewery with a wide selection of beers and tasting events.',
      category: 'brewery',
      location: '88 Brewery Road, Sydney',
      openingHours: 'Wed-Sun: 12:00 PM - 10:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '1-2 hours',
      highlights: [
        'Wide beer selection',
        'Tasting events',
        'Brewery tours'
      ],
      nearbyHotels: [],
      localTips: 'Book tasting events in advance.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: 'Grifters Brewery interior'
    },
    {
      id: '20',
      name: 'Kangaroo Valley',
      description: 'A scenic nature spot with hiking trails, wildlife, and beautiful landscapes.',
      category: 'nature',
      location: 'Kangaroo Valley, NSW',
      openingHours: 'Open 24 hours',
      admissionFee: 'Free entry',
      estimatedVisitTime: '3-5 hours',
      highlights: [
        'Hiking trails',
        'Wildlife spotting',
        'Scenic landscapes'
      ],
      nearbyHotels: [],
      localTips: 'Best visited during spring and autumn.',
      accessibility: 'Some trails may be challenging for mobility impaired visitors.',
      imageAlt: 'Kangaroo Valley scenic view'
    },
    {
      id: '21',
      name: "Old Mate's Place",
      description: 'A friendly pub with a relaxed atmosphere and great drinks.',
      category: 'pub',
      location: '77 Friendly Street, Sydney',
      openingHours: 'Mon-Sun: 11:00 AM - 11:00 PM',
      admissionFee: 'Free entry',
      estimatedVisitTime: '2-3 hours',
      highlights: [
        'Relaxed atmosphere',
        'Great drinks',
        'Friendly staff'
      ],
      nearbyHotels: [],
      localTips: 'Try the house specials.',
      accessibility: 'Wheelchair accessible entrance.',
      imageAlt: "Old Mate's Place pub interior"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Landmarks', icon: '🏛️' },
    { id: 'iconic', label: 'Iconic Sites', icon: '🌟' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'nature', label: 'Nature', icon: '🌳' },
    { id: 'historic', label: 'Historic', icon: '🏛️' },
    { id: 'pub', label: 'Pubs', icon: '🍺' },
    { id: 'brewery', label: 'Breweries', icon: '🍻' },
    { id: 'restaurant', label: 'Restaurants', icon: '🍽️' },
    { id: 'book shop', label: 'Book Shops', icon: '📚' },
    { id: 'retro vibes', label: 'Retro Vibes', icon: '🎷' }
  ];

  const filteredLandmarks = selectedCategory === 'all' 
    ? landmarks 
    : landmarks.filter(landmark => landmark.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'iconic': return 'bg-yellow-100 text-yellow-800';
      case 'cultural': return 'bg-purple-100 text-purple-800';
      case 'nature': return 'bg-green-100 text-green-800';
      case 'historic': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-indigo-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Landmark Explorer</h1>
            </div>
            <div className="text-indigo-100 text-sm">
              🏛️ Discover Sydney's Icons
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredLandmarks.map((landmark) => (
            <div key={landmark.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{landmark.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(landmark.category)}`}>
                    {landmark.category}
                  </span>
                </div>
                <p className="text-indigo-100 text-sm mt-1">📍 {landmark.location}</p>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{landmark.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-800">Hours:</span>
                    <p className="text-gray-600">{landmark.openingHours}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-800">Admission:</span>
                    <p className="text-gray-600">{landmark.admissionFee}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-semibold text-gray-800 text-sm">Visit Time:</span>
                  <span className="text-gray-600 text-sm ml-2">{landmark.estimatedVisitTime}</span>
                </div>

                <button
                  onClick={() => setSelectedLandmark(landmark)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Details & Nearby Hotels
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Landmark Detail Modal */}
      {selectedLandmark && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-indigo-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white">{selectedLandmark.name}</h3>
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="text-white hover:text-indigo-100 text-3xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Highlights */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-3">Must-See Highlights:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedLandmark.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-indigo-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Tips */}
              <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h4 className="font-bold text-yellow-800 mb-2">Local Insider Tips:</h4>
                <p className="text-yellow-700 text-sm">{selectedLandmark.localTips}</p>
              </div>

              {/* Accessibility */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Accessibility:</h4>
                <p className="text-gray-700 text-sm">{selectedLandmark.accessibility}</p>
              </div>

              {/* Nearby Hotels */}
              <div className="mb-6">
                <h4 className="font-bold text-gray-800 mb-4">Nearby Accommodation:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedLandmark.nearbyHotels.map((hotel, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-900">{hotel.name}</h5>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                        </div>
                      </div>
                      <p className="text-green-600 font-medium text-sm mb-1">{hotel.priceRange}</p>
                      <p className="text-gray-600 text-sm mb-2">📍 {hotel.distance} away</p>
                      <div className="flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
