"use client";

import { useState } from "react";
import Link from "next/link";

interface CulturalSite {
  id: string;
  name: string;
  description: string;
  significance: string;
  location: string;
  accessibility: 'Easy' | 'Moderate' | 'Challenging';
  estimatedTime: string;
  respectfulGuidelines: string[];
  imageAlt: string;
}

export default function FirstNationsPage() {
  const [selectedSite, setSelectedSite] = useState<CulturalSite | null>(null);

  const culturalSites: CulturalSite[] = [
    {
      id: '1',
      name: 'Barangaroo Reserve',
      description: 'A culturally significant headland that has been restored to reflect the pre-European landscape of Sydney Harbour.',
      significance: 'Named after Barangaroo, a powerful Cammeraygal woman and wife of Bennelong. This area was an important fishing and gathering place for the Gadigal people.',
      location: 'Barangaroo, Sydney CBD',
      accessibility: 'Easy',
      estimatedTime: '1-2 hours',
      respectfulGuidelines: [
        'Follow designated walking paths',
        'Do not disturb native plants or wildlife',
        'Listen respectfully during cultural tours',
        'Photography of cultural sites should be done respectfully'
      ],
      imageAlt: 'Barangaroo Reserve waterfront with native plants'
    },
    {
      id: '2',
      name: 'Royal Botanic Gardens Aboriginal Heritage Tour',
      description: 'Discover the traditional uses of native plants and learn about the Gadigal people\'s connection to this land.',
      significance: 'This area, known as Woolloomooloo, was a significant place for the Gadigal people for food gathering, ceremonies, and daily life for thousands of years.',
      location: 'Royal Botanic Gardens, Sydney',
      accessibility: 'Easy',
      estimatedTime: '1.5 hours (guided tour)',
      respectfulGuidelines: [
        'Book tours in advance',
        'Listen respectfully to Aboriginal guides',
        'Ask questions thoughtfully and respectfully',
        'Do not touch or take any plants without permission'
      ],
      imageAlt: 'Native plants in the Royal Botanic Gardens'
    },
    {
      id: '3',
      name: 'Ku-ring-gai Chase National Park Rock Engravings',
      description: 'Ancient Aboriginal rock art sites featuring engravings that are thousands of years old.',
      significance: 'These engravings represent one of the largest collections of Aboriginal rock art in Australia, created by the Guringai people over thousands of years.',
      location: 'Ku-ring-gai Chase National Park',
      accessibility: 'Moderate',
      estimatedTime: '2-4 hours',
      respectfulGuidelines: [
        'Stay on marked trails to protect the sites',
        'Do not touch or trace the rock engravings',
        'No rubbings or chalk tracings allowed',
        'Respect the sacred nature of these sites'
      ],
      imageAlt: 'Ancient Aboriginal rock engravings'
    },
    {
      id: '4',
      name: 'The Rocks Aboriginal Dreaming Tour',
      description: 'Walk through The Rocks and learn about the Gadigal people\'s stories, culture, and connection to Sydney Harbour.',
      significance: 'The Rocks area, known as Tallawoladah, was a significant camping and ceremonial ground for the Gadigal people.',
      location: 'The Rocks, Sydney',
      accessibility: 'Easy',
      estimatedTime: '1.5 hours (guided tour)',
      respectfulGuidelines: [
        'Book with certified Aboriginal tour operators',
        'Show respect during storytelling',
        'Ask permission before taking photos',
        'Support Aboriginal-owned businesses'
      ],
      imageAlt: 'The Rocks area with harbour views'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-yellow-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-yellow-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">First Nations Trail</h1>
            </div>
            <div className="text-yellow-100 text-sm">
              🪃 Gadigal Country
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Acknowledgment */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-3xl">🙏</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-yellow-800">
                Acknowledgment of Country
              </h3>
              <p className="text-yellow-700 mt-2">
                We acknowledge the Gadigal people of the Eora Nation as the Traditional Custodians of the land on which Sydney stands. 
                We pay our respects to their Elders past, present, and emerging, and recognize their continuing connection to Country, 
                culture, and community. This land was never ceded and sovereignty was never given up.
              </p>
            </div>
          </div>
        </div>

        {/* Important Guidelines */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">📋</span>
            Cultural Respect Guidelines
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Before You Visit:</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Learn about the significance of each site</li>
                <li>• Book guided tours where available</li>
                <li>• Understand that these are sacred places</li>
                <li>• Come with an open mind and respectful attitude</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">During Your Visit:</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Follow all posted signs and guidelines</li>
                <li>• Stay on designated paths</li>
                <li>• Listen respectfully to Aboriginal guides</li>
                <li>• Ask thoughtful questions when appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cultural Sites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {culturalSites.map((site) => (
            <div key={site.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">{site.name}</h3>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-yellow-100 text-sm">📍 {site.location}</span>
                  <span className="text-yellow-100 text-sm">⏱️ {site.estimatedTime}</span>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 mb-4">{site.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Cultural Significance:</h4>
                  <p className="text-gray-600 text-sm">{site.significance}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-700 font-medium">Accessibility:</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    site.accessibility === 'Easy' ? 'text-green-600 bg-green-100' :
                    site.accessibility === 'Moderate' ? 'text-yellow-600 bg-yellow-100' :
                    'text-red-600 bg-red-100'
                  }`}>
                    {site.accessibility}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedSite(site)}
                  className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Learn More & Guidelines
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Educational Resources */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">📚</span>
            Learn More About Aboriginal Culture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏛️</span>
              </div>
              <h4 className="font-semibold mb-2">Museums & Galleries</h4>
              <p className="text-gray-600 text-sm">Visit the Australian Museum and Art Gallery of NSW for extensive Aboriginal art collections.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎭</span>
              </div>
              <h4 className="font-semibold mb-2">Cultural Performances</h4>
              <p className="text-gray-600 text-sm">Experience traditional dance, music, and storytelling at cultural centers and festivals.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🛍️</span>
              </div>
              <h4 className="font-semibold mb-2">Support Aboriginal Businesses</h4>
              <p className="text-gray-600 text-sm">Purchase authentic art and crafts from Aboriginal-owned businesses and cooperatives.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Site Details */}
      {selectedSite && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="bg-yellow-600 px-6 py-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">{selectedSite.name}</h3>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="text-white hover:text-yellow-100 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Respectful Visit Guidelines:</h4>
                <ul className="space-y-2">
                  {selectedSite.respectfulGuidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span className="text-gray-700 text-sm">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Cultural Significance:</h4>
                <p className="text-gray-700 text-sm">{selectedSite.significance}</p>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-gray-600 text-sm">Estimated Time: {selectedSite.estimatedTime}</span>
                </div>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
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
