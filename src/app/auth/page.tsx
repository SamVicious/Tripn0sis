"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-white flex flex-col justify-center items-center p-6">
      <div className="w-full max-w-md">
        {/* Tripnosis Branding */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Tripnosis</h1>
          <p className="text-gray-600">Your Sydney Tour Guide</p>
        </div>

        {/* Auth Container */}
        <div className="border border-gray-200 rounded-lg shadow-lg p-6 bg-white">
          {/* Tab Navigation */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              className={`flex-1 py-3 text-lg font-medium transition-colors ${
                isLogin 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`flex-1 py-3 text-lg font-medium transition-colors ${
                !isLogin 
                  ? "border-b-2 border-black text-black" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {/* Form Content */}
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Discover Sydney like never before</p>
        </div>
      </div>
    </main>
  );
}
