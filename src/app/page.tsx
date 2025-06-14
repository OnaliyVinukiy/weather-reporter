"use client";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeatherData {
  location?: {
    name: string;
  };
  current?: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    uv: number;
  };
}

export default function Home() {
  const [location, setLocation] = useState("Colombo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch and display weather data
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, []);

  const handleSearch = () => {
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            Weatherly - Your Weather Reporter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter a city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} disabled={loading}>
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>

            {loading && (
              <div className="mt-6 text-center">
                <p>Loading weather data...</p>
              </div>
            )}

            {error && (
              <div className="mt-6 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}

            {weather?.current && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Location:</span>
                  <span className="text-sm">{weather.location?.name}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Temperature:</span>
                  <span className="text-sm">{weather.current.temp_c}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Humidity:</span>
                  <span className="text-sm">{weather.current.humidity}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Wind Speed:</span>
                  <span className="text-sm">
                    {weather.current.wind_kph} km/h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">UV Index:</span>
                  <span className="text-sm">{weather.current.uv}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
