"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface SurfCondition {
  beach: string;
  waveHeight: string;
  windSpeed: string;
  temperature: string;
  uvIndex: number;
  safetyStatus: 'Safe' | 'Caution' | 'Dangerous';
  lifeguardStatus: 'On Duty' | 'Off Duty';
  lastUpdated: string;
  weatherDescription?: string;
}

interface BeachConditionsResponse {
  conditions: SurfCondition[];
  timestamp: string;
  source: string;
}

export default function BondiRescuePage() {
  const [surfConditions, setSurfConditions] = useState<SurfCondition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetch, setLastFetch] = useState<string>('');

  useEffect(() => {
    // Fetch real-time beach conditions from our API
    const fetchSurfConditions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch('/api/beach-conditions');
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data: BeachConditionsResponse = await response.json();
        setSurfConditions(data.conditions);
        setLastFetch(new Date(data.timestamp).toLocaleString('en-AU', {
          timeZone: 'Australia/Sydney',
          hour12: false
        }));
        
      } catch (err) {
        console.error('Error fetching beach conditions:', err);
        setError('Failed to fetch real-time beach conditions. Please try again.');
        
        // Fallback to basic data if API fails
        const fallbackData: SurfCondition[] = [
          {
            beach: "Bondi Beach",
            waveHeight: "1.0-1.5m",
            windSpeed: "15 km/h NE",
            temperature: "22°C",
            uvIndex: 7,
            safetyStatus: "Safe",
            lifeguardStatus: "On Duty",
            lastUpdated: new Date().toLocaleTimeString('en-AU', { 
              timeZone: 'Australia/Sydney',
              hour12: false 
            }),
            weatherDescription: "Data unavailable"
          }
        ];
        setSurfConditions(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchSurfConditions();
    
    // Auto-refresh every 10 minutes (real APIs have rate limits)
    const interval = setInterval(fetchSurfConditions, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Safe': return 'text-green-600 bg-green-100';
      case 'Caution': return 'text-yellow-600 bg-yellow-100';
      case 'Dangerous': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getUVColor = (uvIndex: number) => {
    if (uvIndex <= 2) return 'text-green-600';
    if (uvIndex <= 5) return 'text-yellow-600';
    if (uvIndex <= 7) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-blue-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Bondi Rescue Mode</h1>
            </div>
            <div className="text-blue-100 text-sm">
              🏄‍♂️ Live Beach Conditions
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">🚨</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-blue-800">
                Real-Time Beach Safety Updates
              </h3>
              <p className="text-blue-700">
                Live weather data from OpenWeatherMap API. Wave heights estimated from wind conditions. Always follow lifeguard instructions on the beach.
              </p>
              {lastFetch && (
                <p className="text-blue-600 text-sm mt-1">
                  Last updated: {lastFetch} (Sydney time)
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Data Connection Issue
                </h3>
                <p className="text-red-700">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-2 text-red-800 underline hover:no-underline"
                >
                  Retry Loading Data
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading real-time beach conditions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {surfConditions.map((condition, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                  <h3 className="text-xl font-bold text-white">{condition.beach}</h3>
                  <p className="text-blue-100 text-sm">Last updated: {condition.lastUpdated}</p>
                  {condition.weatherDescription && (
                    <p className="text-blue-100 text-sm capitalize">{condition.weatherDescription}</p>
                  )}
                </div>
                
                <div className="p-6">
                  {/* Safety Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-medium">Safety Status:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(condition.safetyStatus)}`}>
                      {condition.safetyStatus}
                    </span>
                  </div>

                  {/* Lifeguard Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-700 font-medium">Lifeguards:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      condition.lifeguardStatus === 'On Duty' ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {condition.lifeguardStatus}
                    </span>
                  </div>

                  {/* Conditions Grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">🌊</div>
                      <div className="text-sm text-gray-600">Wave Height</div>
                      <div className="font-semibold">{condition.waveHeight}</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">💨</div>
                      <div className="text-sm text-gray-600">Wind</div>
                      <div className="font-semibold">{condition.windSpeed}</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">🌡️</div>
                      <div className="text-sm text-gray-600">Temperature</div>
                      <div className="font-semibold">{condition.temperature}</div>
                    </div>
                    
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">☀️</div>
                      <div className="text-sm text-gray-600">UV Index</div>
                      <div className={`font-semibold ${getUVColor(condition.uvIndex)}`}>
                        {condition.uvIndex}/10
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      const query = encodeURIComponent(condition.beach);
                      const url = `https://www.google.com/maps?q=${query}`;
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Get Directions to {condition.beach}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Safety Tips */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">🏊‍♂️</span>
            Beach Safety Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-green-500 text-xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold">Swim Between the Flags</h4>
                <p className="text-gray-600 text-sm">Always swim in the designated safe swimming areas marked by red and yellow flags.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 text-xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold">Check with Lifeguards</h4>
                <p className="text-gray-600 text-sm">Ask lifeguards about current conditions before entering the water.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 text-xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold">Sun Protection</h4>
                <p className="text-gray-600 text-sm">Use SPF 30+ sunscreen and reapply every 2 hours, especially with high UV index.</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 text-xl mr-3">✓</span>
              <div>
                <h4 className="font-semibold">Know Your Limits</h4>
                <p className="text-gray-600 text-sm">Don't swim beyond your ability level and stay close to shore if you're not a strong swimmer.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <p className="text-gray-700 text-sm">
            <strong>Data Sources:</strong> Real-time weather data from OpenWeatherMap API. 
            Wave heights are estimated based on wind conditions. Lifeguard status is estimated based on typical patrol hours (6 AM - 6 PM). 
            Always check with local surf life saving services for the most accurate and up-to-date safety information.
          </p>
        </div>
      </div>
    </main>
  );
}
