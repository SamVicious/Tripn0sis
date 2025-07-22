"use client";

import { useState } from "react";
import Link from "next/link";

interface ItineraryPreferences {
  budget: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  duration: '4-hours' | 'full-day' | 'weekend';
  mobility: 'walking' | 'public-transport' | 'mixed';
  groupSize: number;
}

interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
  cost: string;
  duration: string;
  tips: string;
}

interface GeneratedItinerary {
  title: string;
  totalCost: string;
  totalDuration: string;
  items: ItineraryItem[];
}

export default function ItinerariesPage() {
  const [step, setStep] = useState<'preferences' | 'generated'>('preferences');
  const [preferences, setPreferences] = useState<ItineraryPreferences>({
    budget: 'mid-range',
    interests: [],
    duration: 'full-day',
    mobility: 'mixed',
    groupSize: 2
  });
  const [generatedItinerary, setGeneratedItinerary] = useState<GeneratedItinerary | null>(null);
  const [loading, setLoading] = useState(false);

  const interestOptions = [
    { id: 'beaches', label: 'Beaches & Coastal', icon: '🏖️' },
    { id: 'culture', label: 'Arts & Culture', icon: '🎭' },
    { id: 'food', label: 'Food & Drink', icon: '🍽️' },
    { id: 'history', label: 'History & Heritage', icon: '🏛️' },
    { id: 'nature', label: 'Parks & Nature', icon: '🌳' },
    { id: 'nightlife', label: 'Nightlife & Entertainment', icon: '🌃' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'adventure', label: 'Adventure & Sports', icon: '🏄‍♂️' }
  ];

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateItinerary = async () => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock itinerary based on preferences
    const mockItinerary: GeneratedItinerary = {
      title: "Your Perfect Sydney Day",
      totalCost: preferences.budget === 'budget' ? '$45-65' : preferences.budget === 'mid-range' ? '$85-120' : '$180-250',
      totalDuration: preferences.duration === '4-hours' ? '4 hours' : preferences.duration === 'full-day' ? '8-10 hours' : '2 days',
      items: [
        {
          id: '1',
          time: '9:00 AM',
          title: 'Start at Circular Quay',
          description: 'Begin your Sydney adventure at the iconic transport hub with stunning harbour views.',
          location: 'Circular Quay, Sydney',
          cost: 'Free',
          duration: '30 mins',
          tips: 'Grab a coffee from a nearby cafe and enjoy the morning harbour breeze.'
        },
        {
          id: '2',
          time: '9:30 AM',
          title: 'Sydney Opera House Tour',
          description: preferences.interests.includes('culture') 
            ? 'Guided tour of the world-famous Opera House interior and architecture.'
            : 'Walk around the Opera House and take photos from different angles.',
          location: 'Sydney Opera House',
          cost: preferences.interests.includes('culture') ? '$43' : 'Free',
          duration: '1.5 hours',
          tips: 'Book tours in advance. Free exterior viewing is just as impressive!'
        },
        {
          id: '3',
          time: '11:30 AM',
          title: 'Royal Botanic Gardens',
          description: 'Stroll through beautiful gardens with harbour views and native Australian plants.',
          location: 'Royal Botanic Gardens',
          cost: 'Free',
          duration: '1 hour',
          tips: 'Don\'t miss Mrs Macquarie\'s Chair for the perfect Sydney Harbour photo.'
        },
        {
          id: '4',
          time: '1:00 PM',
          title: preferences.interests.includes('food') ? 'Lunch at Quay Restaurant' : 'Lunch at The Rocks Markets',
          description: preferences.interests.includes('food') 
            ? 'Fine dining with harbour views - one of Sydney\'s best restaurants.'
            : 'Casual lunch with local food vendors and artisan products.',
          location: preferences.interests.includes('food') ? 'Quay Restaurant' : 'The Rocks Markets',
          cost: preferences.interests.includes('food') ? '$85-120' : '$15-25',
          duration: '1.5 hours',
          tips: preferences.interests.includes('food') 
            ? 'Reservations essential. Try the famous snow egg dessert!'
            : 'Try the gourmet pies and local honey products.'
        },
        {
          id: '5',
          time: '3:00 PM',
          title: preferences.interests.includes('beaches') ? 'Ferry to Manly Beach' : 'Harbour Bridge Walk',
          description: preferences.interests.includes('beaches')
            ? 'Scenic ferry ride to Manly Beach for swimming and beach culture.'
            : 'Walk across the iconic Sydney Harbour Bridge for spectacular views.',
          location: preferences.interests.includes('beaches') ? 'Manly Beach' : 'Sydney Harbour Bridge',
          cost: preferences.interests.includes('beaches') ? '$8.05 (ferry)' : 'Free',
          duration: '2-3 hours',
          tips: preferences.interests.includes('beaches')
            ? 'The ferry ride itself is a tourist attraction. Pack sunscreen!'
            : 'Start from the Rocks side. Pedestrian walkway is free!'
        }
      ]
    };

    setGeneratedItinerary(mockItinerary);
    setLoading(false);
    setStep('generated');
  };

  if (step === 'generated' && generatedItinerary) {
    return (
      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-red-600 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={() => setStep('preferences')}
                  className="text-white hover:text-red-100 mr-4"
                >
                  ← Back to Preferences
                </button>
                <h1 className="text-2xl font-bold text-white">Your Custom Itinerary</h1>
              </div>
              <div className="text-red-100 text-sm">
                📋 Personalized for You
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Itinerary Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{generatedItinerary.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl mb-2">💰</div>
                <div className="text-sm text-gray-600">Estimated Cost</div>
                <div className="font-bold text-red-600">{generatedItinerary.totalCost}</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="text-sm text-gray-600">Duration</div>
                <div className="font-bold text-red-600">{generatedItinerary.totalDuration}</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl mb-2">👥</div>
                <div className="text-sm text-gray-600">Group Size</div>
                <div className="font-bold text-red-600">{preferences.groupSize} people</div>
              </div>
            </div>
          </div>

          {/* Itinerary Timeline */}
          <div className="space-y-6">
            {generatedItinerary.items.map((item, index) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="bg-red-600 text-white p-4 flex flex-col items-center justify-center min-w-[100px]">
                    <div className="text-lg font-bold">{item.time}</div>
                    <div className="text-xs opacity-75">{item.duration}</div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                        {item.cost}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <p className="text-gray-500 text-sm mb-3">📍 {item.location}</p>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                      <p className="text-blue-800 text-sm">
                        <strong>Local Tip:</strong> {item.tips}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors">
              Save Itinerary
            </button>
            <button className="flex-1 bg-white text-red-600 border border-red-600 py-3 px-6 rounded-lg hover:bg-red-50 transition-colors">
              Share with Friends
            </button>
            <button 
              onClick={() => setStep('preferences')}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Create New Itinerary
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-red-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Custom Itineraries</h1>
            </div>
            <div className="text-red-100 text-sm">
              📋 Personalized Sydney Plans
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Creating Your Perfect Sydney Itinerary...</h3>
            <p className="text-gray-600">Analyzing your preferences and finding the best local experiences</p>
          </div>
        ) : (
          <>
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Plan Your Perfect Sydney Experience</h2>
              <p className="text-gray-700">
                Tell us about your preferences and we'll create a personalized itinerary with local insights, 
                hidden gems, and the best experiences Sydney has to offer - all tailored to your budget and interests.
              </p>
            </div>

            {/* Preferences Form */}
            <div className="space-y-8">
              {/* Budget Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's your budget?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'budget', label: 'Budget Explorer', desc: '$30-60 per day', icon: '💰' },
                    { id: 'mid-range', label: 'Comfortable Traveler', desc: '$80-150 per day', icon: '💳' },
                    { id: 'luxury', label: 'Premium Experience', desc: '$200+ per day', icon: '💎' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setPreferences(prev => ({ ...prev, budget: option.id as any }))}
                      className={`p-4 border-2 rounded-lg text-left transition-colors ${
                        preferences.budget === option.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-semibold">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests Selection */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What interests you? (Select all that apply)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`p-3 border-2 rounded-lg text-center transition-colors ${
                        preferences.interests.includes(interest.id)
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{interest.icon}</div>
                      <div className="text-sm font-medium">{interest.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration & Other Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">How long do you have?</h3>
                  <div className="space-y-2">
                    {[
                      { id: '4-hours', label: 'Half Day (4 hours)' },
                      { id: 'full-day', label: 'Full Day (8-10 hours)' },
                      { id: 'weekend', label: 'Weekend (2 days)' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPreferences(prev => ({ ...prev, duration: option.id as any }))}
                        className={`w-full p-3 border-2 rounded-lg text-left transition-colors ${
                          preferences.duration === option.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Group size</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, groupSize: Math.max(1, prev.groupSize - 1) }))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-xl font-bold">{preferences.groupSize}</span>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, groupSize: Math.min(10, prev.groupSize + 1) }))}
                      className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {preferences.groupSize === 1 ? 'Solo traveler' : `${preferences.groupSize} people`}
                  </p>
                </div>
              </div>

              {/* Generate Button */}
              <div className="text-center">
                <button
                  onClick={generateItinerary}
                  disabled={preferences.interests.length === 0}
                  className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate My Sydney Itinerary
                </button>
                {preferences.interests.length === 0 && (
                  <p className="text-red-600 text-sm mt-2">Please select at least one interest to continue</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
