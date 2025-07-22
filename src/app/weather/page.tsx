"use client";

import * as React from "react";
import { useWeather } from "@/hooks/useWeather";
import { WeatherCard } from "@/components/WeatherCard";

export default function WeatherPage() {
  const { weather, loading, error, refetch } = useWeather();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {loading && (
          <div className="text-center">
            <div className="text-lg font-medium mb-4">Loading weather data...</div>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="text-center bg-card p-6 rounded-xl border shadow-sm">
            <div className="text-destructive font-semibold mb-4 text-lg">
              Weather Unavailable
            </div>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button
              onClick={refetch}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {weather && !loading && !error && (
          <WeatherCard weather={weather} />
        )}
      </div>
    </main>
  );
}
