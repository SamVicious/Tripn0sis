"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import AddBusinessModal from "@/components/AddBusinessModal";

export default function DashboardPage() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens/cookies here
    router.push("/auth");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b" style={{ backgroundColor: '#1e40af' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">Tripnosis</h1>
              <span className="ml-2 text-sm text-blue-100">Sydney's secrets, served fresh daily</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white hover:text-blue-100 border border-blue-300 rounded-md hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8" style={{ borderLeft: '4px solid #dc2626' }}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            G'day! Welcome to Tripnosis! 🇦🇺
          </h2>
          <p className="text-gray-600 text-lg">
            Explore Sydney like a real SydneySider - beyond the Opera House!
          </p>
        </div>

        {/* Sydney-Specific Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bondi Rescue Mode */}
          <Link href="/features/bondi-rescue" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-blue-500">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏄‍♂️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bondi Rescue Mode
              </h3>
              <p className="text-gray-600 mb-4">
                Real-time surf conditions and safety alerts from lifeguard APIs.
              </p>
              <span className="text-blue-600 font-medium">Explore →</span>
            </div>
          </Link>

          {/* First Nations Trail */}
          <Link href="/features/first-nations" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-yellow-600">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🪃</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                First Nations Trail
              </h3>
              <p className="text-gray-600 mb-4">
                Discover Aboriginal cultural sites co-created with Gadigal elders.
              </p>
              <span className="text-yellow-600 font-medium">Explore →</span>
            </div>
          </Link>

          {/* Opal Card Wizard */}
          <Link href="/features/opal-wizard" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-green-500">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚇</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Opal Card Wizard
              </h3>
              <p className="text-gray-600 mb-4">
                Smart alerts to save money on Sydney transport with real-time data.
              </p>
              <span className="text-green-600 font-medium">Explore →</span>
            </div>
          </Link>

          {/* AI Tourist Guide */}
          <Link href="/features/ai-guide" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-purple-500">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Sydney Guide
              </h3>
              <p className="text-gray-600 mb-4">
                Your personal AI guide with authentic Sydney accent and local knowledge.
              </p>
              <span className="text-purple-600 font-medium">Chat Now →</span>
            </div>
          </Link>

          {/* Custom Itineraries */}
          <Link href="/features/itineraries" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-red-500">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Custom Itineraries
              </h3>
              <p className="text-gray-600 mb-4">
                Personalized day plans based on your interests and budget.
              </p>
              <span className="text-red-600 font-medium">Plan Trip →</span>
            </div>
          </Link>

          {/* Landmark Explorer */}
          <Link href="/features/landmarks" className="block">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-indigo-500">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Landmark Explorer
              </h3>
              <p className="text-gray-600 mb-4">
                Detailed info on Sydney landmarks with nearby accommodation options.
              </p>
              <span className="text-indigo-600 font-medium">Discover →</span>
            </div>
          </Link>
        </div>

        {/* Local Business Partnerships */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-red-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">🤝</span>
            <h4 className="text-xl font-bold text-gray-900">Local Partnerships</h4>
          </div>
          <p className="text-gray-700 mb-4">
            Exclusive deals with Surry Hills cafes, bars, and local businesses. Show your Tripnosis app for special discounts!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold">Surry Hills Bars</h5>
              <p className="text-sm text-gray-600">20% off craft cocktails</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold">Local Cafes</h5>
              <p className="text-sm text-gray-600">Free coffee upgrade</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h5 className="font-semibold">Opera Bar</h5>
              <p className="text-sm text-gray-600">Discount with #TripnosisSydney</p>
            </div>
            <div className="bg-white p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow" onClick={() => setModalOpen(true)}>
              <h5 className="font-semibold text-blue-600">Add your business</h5>
              <p className="text-sm text-blue-600 underline">Promote your bar or cafe</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
