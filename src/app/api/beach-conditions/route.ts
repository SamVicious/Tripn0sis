import { NextResponse } from "next/server";

interface BeachCoordinates {
  lat: number;
  lon: number;
}

interface BeachCondition {
  beach: string;
  waveHeight: string;
  windSpeed: string;
  temperature: string;
  uvIndex: number;
  safetyStatus: 'Safe' | 'Caution' | 'Dangerous';
  lifeguardStatus: 'On Duty' | 'Off Duty';
  lastUpdated: string;
  weatherDescription: string;
}

export async function GET() {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Weather API key not configured" },
        { status: 500 }
      );
    }

    // Sydney beaches coordinates
    const beaches: Record<string, BeachCoordinates> = {
      "Bondi Beach": { lat: -33.8908, lon: 151.2743 },
      "Coogee Beach": { lat: -33.9234, lon: 151.2593 },
      "Manly Beach": { lat: -33.7969, lon: 151.2870 }
    };

    const beachConditions: BeachCondition[] = [];

    for (const [beachName, coords] of Object.entries(beaches)) {
      try {
        // Fetch current weather data from OpenWeatherMap using current weather API
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`;
        
        const weatherResponse = await fetch(weatherUrl);
        
        if (!weatherResponse.ok) {
          console.error(`Weather API error for ${beachName}:`, weatherResponse.status);
          continue;
        }

        const weatherData = await weatherResponse.json();
        
        // Calculate wave height estimate based on wind conditions
        const windSpeedKmh = weatherData.wind.speed * 3.6; // Convert m/s to km/h
        
        // Estimate wave height based on wind speed (simplified calculation)
        let waveHeightMin = 0.5;
        let waveHeightMax = 1.0;
        
        if (windSpeedKmh > 30) {
          waveHeightMin = 2.0;
          waveHeightMax = 3.5;
        } else if (windSpeedKmh > 20) {
          waveHeightMin = 1.2;
          waveHeightMax = 2.2;
        } else if (windSpeedKmh > 10) {
          waveHeightMin = 0.8;
          waveHeightMax = 1.5;
        }

        // Estimate UV index based on time of day (since current weather API doesn't include UV)
        const currentHour = new Date().getHours();
        let estimatedUV = 5; // Default moderate
        if (currentHour >= 10 && currentHour <= 14) {
          estimatedUV = 8; // High during midday
        } else if (currentHour >= 8 && currentHour <= 16) {
          estimatedUV = 6; // Moderate during day
        } else {
          estimatedUV = 2; // Low during early/late hours
        }

        // Determine safety status based on conditions
        let safetyStatus: 'Safe' | 'Caution' | 'Dangerous' = 'Safe';
        if (windSpeedKmh > 35 || waveHeightMax > 3.0 || estimatedUV > 9) {
          safetyStatus = 'Dangerous';
        } else if (windSpeedKmh > 25 || waveHeightMax > 2.0 || estimatedUV > 7) {
          safetyStatus = 'Caution';
        }

        // Determine lifeguard status (simplified - in reality this would come from NSW Surf Life Saving)
        const lifeguardStatus: 'On Duty' | 'Off Duty' = 
          (currentHour >= 6 && currentHour <= 18) ? 'On Duty' : 'Off Duty';

        // Convert wind direction to compass direction
        const getWindDirection = (degrees: number): string => {
          const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
          const index = Math.round(degrees / 22.5) % 16;
          return directions[index];
        };

        const condition: BeachCondition = {
          beach: beachName,
          waveHeight: `${waveHeightMin.toFixed(1)}-${waveHeightMax.toFixed(1)}m`,
          windSpeed: `${Math.round(windSpeedKmh)} km/h ${getWindDirection(weatherData.wind.deg)}`,
          temperature: `${Math.round(weatherData.main.temp)}°C`,
          uvIndex: estimatedUV,
          safetyStatus,
          lifeguardStatus,
          lastUpdated: new Date().toLocaleTimeString('en-AU', { 
            timeZone: 'Australia/Sydney',
            hour12: false 
          }),
          weatherDescription: weatherData.weather[0]?.description || 'Clear'
        };

        beachConditions.push(condition);

      } catch (error) {
        console.error(`Error fetching data for ${beachName}:`, error);
        // Add fallback data for this beach
        beachConditions.push({
          beach: beachName,
          waveHeight: "1.0-1.5m",
          windSpeed: "15 km/h NE",
          temperature: "22°C",
          uvIndex: 6,
          safetyStatus: 'Safe',
          lifeguardStatus: 'On Duty',
          lastUpdated: new Date().toLocaleTimeString('en-AU', { 
            timeZone: 'Australia/Sydney',
            hour12: false 
          }),
          weatherDescription: 'Data unavailable'
        });
      }
    }

    return NextResponse.json({ 
      conditions: beachConditions,
      timestamp: new Date().toISOString(),
      source: 'OpenWeatherMap API'
    });

  } catch (error) {
    console.error("Beach conditions API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch beach conditions" },
      { status: 500 }
    );
  }
}
