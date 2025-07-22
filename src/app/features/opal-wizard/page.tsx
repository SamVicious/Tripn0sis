"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface OpalData {
  balance: number;
  weeklySpend: number;
  weeklyCapReached: boolean;
  dailySpend: number;
  dailyCapReached: boolean;
  lastTrip: string;
  suggestedTopUp: number;
  savings: number;
}

interface TransportAlert {
  id: string;
  type: 'savings' | 'warning' | 'info';
  title: string;
  message: string;
  action?: string;
}

export default function OpalWizardPage() {
  const [opalData, setOpalData] = useState<OpalData | null>(null);
  const [alerts, setAlerts] = useState<TransportAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to Transport NSW
    const fetchOpalData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockOpalData: OpalData = {
        balance: 23.45,
        weeklySpend: 47.80,
        weeklyCapReached: false,
        dailySpend: 8.20,
        dailyCapReached: false,
        lastTrip: "Central to Circular Quay",
        suggestedTopUp: 25.00,
        savings: 12.30
      };

      const mockAlerts: TransportAlert[] = [
        {
          id: '1',
          type: 'savings',
          title: 'Weekly Cap Alert',
          message: 'You\'re $2.20 away from hitting your weekly travel cap! Take more trips this week to maximize value.',
          action: 'Plan more trips'
        },
        {
          id: '2',
          type: 'info',
          title: 'Sunday Funday',
          message: 'Remember: $2.80 daily cap on Sundays after 8am. Perfect for exploring!',
        },
        {
          id: '3',
          type: 'warning',
          title: 'Low Balance Warning',
          message: 'Your balance is getting low. Top up $25 to avoid being caught short.',
          action: 'Top up now'
        }
      ];

      setOpalData(mockOpalData);
      setAlerts(mockAlerts);
      setLoading(false);
    };

    fetchOpalData();
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'savings': return 'bg-green-50 border-green-200 text-green-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'savings': return '💰';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="text-white hover:text-green-100 mr-4">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-white">Opal Card Wizard</h1>
            </div>
            <div className="text-green-100 text-sm">
              🚇 Smart Transport Savings
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Connecting to Transport NSW APIs...</p>
          </div>
        ) : (
          <>
            {/* Opal Card Overview */}
            {opalData && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Your Opal Card</h2>
                  <div className="bg-green-100 px-4 py-2 rounded-lg">
                    <span className="text-green-800 font-semibold">Balance: ${opalData.balance.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-sm text-gray-600">Weekly Spend</div>
                    <div className="text-xl font-bold text-gray-900">${opalData.weeklySpend.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Cap: $50.00</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">📅</div>
                    <div className="text-sm text-gray-600">Daily Spend</div>
                    <div className="text-xl font-bold text-gray-900">${opalData.dailySpend.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Cap: $16.10</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">💰</div>
                    <div className="text-sm text-gray-600">Weekly Savings</div>
                    <div className="text-xl font-bold text-green-600">${opalData.savings.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">vs. single tickets</div>
                  </div>

                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl mb-2">🚊</div>
                    <div className="text-sm text-gray-600">Last Trip</div>
                    <div className="text-sm font-semibold text-gray-900">{opalData.lastTrip}</div>
                    <div className="text-xs text-gray-500">2 hours ago</div>
                  </div>
                </div>
              </div>
            )}

            {/* Smart Alerts */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Alerts & Tips</h3>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{getAlertIcon(alert.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{alert.title}</h4>
                        <p className="text-sm mb-2">{alert.message}</p>
                        {alert.action && (
                          <button className="text-sm font-medium underline hover:no-underline">
                            {alert.action}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transport Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Money-Saving Tips */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💡</span>
                  Money-Saving Tips
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <div>
                      <h4 className="font-semibold">Weekly Travel Cap</h4>
                      <p className="text-gray-600 text-sm">After $50 in a week, all trips are free! Plan your travel to maximize this.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <div>
                      <h4 className="font-semibold">Off-Peak Discounts</h4>
                      <p className="text-gray-600 text-sm">Travel outside 7-9am and 4-6:30pm for 30% off train fares.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 text-xl mr-3">✓</span>
                    <div>
                      <h4 className="font-semibold">Sunday Funday</h4>
                      <p className="text-gray-600 text-sm">$2.80 daily cap on Sundays after 8am - perfect for exploring!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Journey Planner Integration */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🗺️</span>
                  Smart Journey Planning
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Cheapest Route to Bondi</h4>
                    <p className="text-blue-700 text-sm">Train to Bondi Junction + Bus (Off-peak: $3.61)</p>
                    <p className="text-blue-600 text-xs">vs. Direct bus: $4.95 - Save $1.34!</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Airport Connection</h4>
                    <p className="text-green-700 text-sm">Train to Airport: $20.32 (includes station access fee)</p>
                    <p className="text-green-600 text-xs">Alternative: Bus to Mascot + Train saves $5.50</p>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Plan Your Journey
                  </button>
                </div>
              </div>
            </div>

            {/* Real-time Service Updates */}
            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">🚨</span>
                Live Service Updates
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="font-semibold">T1 Western Line</span>
                  </div>
                  <p className="text-sm text-gray-600">Good service</p>
                </div>
                <div className="p-4 border border-yellow-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                    <span className="font-semibold">T4 Eastern Suburbs</span>
                  </div>
                  <p className="text-sm text-gray-600">Minor delays - 5 mins</p>
                </div>
                <div className="p-4 border border-green-200 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="font-semibold">Ferry Services</span>
                  </div>
                  <p className="text-sm text-gray-600">All services running</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
