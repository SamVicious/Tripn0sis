"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
      } else {
        // Set auth token in multiple storage mechanisms for resilience

        // 1. Set in cookies with SameSite attribute
        Cookies.set('auth-token', data.token, {
          expires: 7,
          sameSite: 'strict',
          secure: window.location.protocol === 'https:'
        });

        // 2. Also store in localStorage as backup
        try {
          localStorage.setItem('auth-token', data.token);
          localStorage.setItem('auth-expiry', String(Date.now() + 7 * 24 * 60 * 60 * 1000)); // 7 days
        } catch (storageErr) {
          console.warn('Could not store auth in localStorage', storageErr);
        }

        // 3. Store user data in sessionStorage
        try {
          const userData = {
            id: data.user.id,
            email: data.user.email,
            username: data.user.name
          };
          sessionStorage.setItem('userData', JSON.stringify(userData));
        } catch (sessionErr) {
          console.warn('Could not store in sessionStorage', sessionErr);
        }

        // Navigate to dashboard
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="login-email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="you@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Enter your password"
          required
        />
      </div>
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <div className="text-center text-sm text-gray-500 mt-4">
        <p>Demo credentials: user@example.com / password</p>
      </div>
    </form>
  );
}
