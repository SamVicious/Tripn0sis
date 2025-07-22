import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WeatherData } from "@/hooks/useWeather";

interface WeatherCardProps {
  weather: WeatherData;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Current Weather</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {weather.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="text-center">
            <div className="text-6xl font-light mb-2">
              {Math.round(weather.temperature)}°C
            </div>
            <div className="text-lg capitalize text-muted-foreground">
              {weather.description}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-semibold">{weather.humidity}%</div>
              <div className="text-sm text-muted-foreground">Humidity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">{Math.round(weather.windSpeed)} m/s</div>
              <div className="text-sm text-muted-foreground">Wind Speed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
