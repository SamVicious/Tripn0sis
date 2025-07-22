"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Landmark {
  id: string;
  name: string;
  description: string;
  category: 'iconic' | 'cultural' | 'nature' | 'historic' | 'pub' | 'restaurant';
  location: string;
  openingHours: string;
  admissionFee: string;
  estimatedVisitTime: string;
  highlights: string[];
  nearbyHotels: Hotel[];
  localTips: string;
  accessibility: string;
  imageAlt: string;
  photos: string[]; // Array of photo URLs
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
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLandmarks = async () => {
      try {
        const response = await fetch('/api/landmarks');
        const data = await response.json();
        setLandmarks(data.landmarks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching landmarks:', error);
        setLoading(false);
      }
    };

    fetchLandmarks();
  }, []);

  // Filter landmarks by category
  const filteredLandmarks = selectedCategory === 'all'
    ? landmarks
    : landmarks.filter(landmark => landmark.category === selectedCategory);

  // Function to handle landmark selection
  const handleSelectLandmark = (landmark: Landmark) => {
    setSelectedLandmark(landmark);
    // Add overflow hidden to body when modal is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedLandmark(null);
    // Restore body overflow when modal is closed
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-lg text-gray-700">Loading Sydney landmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-800 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Sydney Landmark Explorer</h1>
          <p className="mt-2 text-blue-100">Discover Sydney's iconic sites with detailed information and nearby accommodations</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('iconic')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'iconic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Iconic
            </button>
            <button
              onClick={() => setSelectedCategory('nature')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'nature' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Nature
            </button>
            <button
              onClick={() => setSelectedCategory('historic')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'historic' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Historic
            </button>
            <button
              onClick={() => setSelectedCategory('cultural')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'cultural' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Cultural
            </button>
            <button
              onClick={() => setSelectedCategory('pub')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'pub' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Pubs
            </button>
            <button
              onClick={() => setSelectedCategory('restaurant')}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === 'restaurant' 
                ? 'bg-blue-600 text-white' 
                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Restaurants
            </button>
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandmarks.map(landmark => (
            <div
              key={landmark.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleSelectLandmark(landmark)}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-gray-900">{landmark.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {landmark.category.charAt(0).toUpperCase() + landmark.category.slice(1)}
                  </span>
                </div>
                <p className="mt-2 text-gray-600 line-clamp-2">{landmark.description}</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {landmark.location}
                </div>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {landmark.estimatedVisitTime}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm font-medium text-blue-600">
                    <div className="flex items-center">
                      <span>View details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {landmark.nearbyHotels.length > 0 ? `${landmark.nearbyHotels.length} nearby ${landmark.nearbyHotels.length === 1 ? 'hotel' : 'hotels'}` : 'No nearby hotels'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Overlay */}
      {selectedLandmark && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto" onClick={handleCloseModal}>
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>

          <div
            className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedLandmark.name}</h2>
                <p className="text-sm text-blue-600 mt-1">{selectedLandmark.category.charAt(0).toUpperCase() + selectedLandmark.category.slice(1)} Attraction</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-700">{selectedLandmark.description}</p>

              {/* Photo Gallery */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Gallery</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedLandmark.photos && selectedLandmark.photos.length > 0 ? (
                    selectedLandmark.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="h-48 rounded-lg overflow-hidden shadow-sm border border-gray-200"
                      >
                        <img
                          src={photo}
                          alt={`${selectedLandmark.name} - Photo ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))
                  ) : (
                    <p className="col-span-3 text-gray-500 italic">No photos available for this landmark.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Key Information</h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Location:</dt>
                      <dd className="text-gray-900 flex-1">{selectedLandmark.location}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Opening Hours:</dt>
                      <dd className="text-gray-900 flex-1">{selectedLandmark.openingHours}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Admission:</dt>
                      <dd className="text-gray-900 flex-1">{selectedLandmark.admissionFee}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Visit Time:</dt>
                      <dd className="text-gray-900 flex-1">{selectedLandmark.estimatedVisitTime}</dd>
                    </div>
                    <div className="flex">
                      <dt className="w-32 font-medium text-gray-500">Accessibility:</dt>
                      <dd className="text-gray-900 flex-1">{selectedLandmark.accessibility}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Highlights</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedLandmark.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-medium text-blue-800">Local Tips</h4>
                    <p className="text-sm text-blue-700 mt-1">{selectedLandmark.localTips}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Nearby Accommodations</h3>
                {selectedLandmark.nearbyHotels.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedLandmark.nearbyHotels.map((hotel, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                        <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${i < hotel.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 ml-1">({hotel.rating}/5)</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{hotel.priceRange}</p>
                        <p className="text-sm text-gray-600">{hotel.distance} from {selectedLandmark.name}</p>
                        <div className="mt-2">
                          <h5 className="text-xs font-medium text-gray-700">Amenities:</h5>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {hotel.amenities.map((amenity, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No nearby accommodations available.</p>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
