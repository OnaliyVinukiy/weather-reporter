"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WeatherData {
  location?: {
    name: string;
    localtime: string;
  };
  current?: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    uv: number;
    condition: {
      text: string;
      icon: string;
    };
    is_day: number;
  };
  forecast?: {
    forecastday?: Array<{
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        avgvis_km: number;
        avghumidity: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moonrise: string;
        moonset: string;
        moon_phase: string;
        moon_illumination: string;
        is_moon_up: number;
        is_sun_up: number;
      };
      hour: Array<{
        time_epoch: number;
        time: string;
        temp_c: number;
        temp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        precip_mm: number;
        precip_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        windchill_c: number;
        windchill_f: number;
        heatindex_c: number;
        heatindex_f: number;
        dewpoint_c: number;
        dewpoint_f: number;
        will_it_rain: number;
        will_it_snow: number;
        is_day: number;
        vis_km: number;
        vis_miles: number;
      }>;
    }>;
  };
}

export default function Home() {
  const [location, setLocation] = useState("Colombo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backgroundClass, setBackgroundClass] = useState(
    "bg-gradient-to-br from-gray-900 to-black"
  );
  const [cardClass, setCardClass] = useState(
    "bg-gray-800/80 border-gray-700/50"
  );

  // Set background based on time and weather
  useEffect(() => {
    if (!weather) return;

    const isDay = weather.current?.is_day === 1;
    const weatherCondition = weather.current?.condition.text.toLowerCase();

    let newBackground = "";
    let newCardClass = "";

    if (isDay) {
      if (
        weatherCondition?.includes("sunny") ||
        weatherCondition?.includes("clear")
      ) {
        newBackground = "bg-gradient-to-br from-blue-400 to-blue-600";
        newCardClass = "bg-blue-500/30 border-blue-400/50";
      } else if (
        weatherCondition?.includes("cloudy") ||
        weatherCondition?.includes("overcast")
      ) {
        newBackground = "bg-gradient-to-br from-gray-400 to-gray-600";
        newCardClass = "bg-gray-500/30 border-gray-400/50";
      } else if (
        weatherCondition?.includes("rain") ||
        weatherCondition?.includes("drizzle")
      ) {
        newBackground = "bg-gradient-to-br from-gray-500 to-blue-800";
        newCardClass = "bg-blue-700/30 border-blue-600/50";
      } else {
        newBackground = "bg-gradient-to-br from-blue-300 to-blue-500";
        newCardClass = "bg-blue-400/30 border-blue-300/50";
      }
    } else {
      if (weatherCondition?.includes("clear")) {
        newBackground = "bg-gradient-to-br from-indigo-900 to-purple-900";
        newCardClass = "bg-indigo-800/30 border-indigo-700/50";
      } else if (weatherCondition?.includes("cloudy")) {
        newBackground = "bg-gradient-to-br from-gray-800 to-gray-900";
        newCardClass = "bg-gray-700/30 border-gray-600/50";
      } else if (weatherCondition?.includes("rain")) {
        newBackground = "bg-gradient-to-br from-gray-700 to-blue-900";
        newCardClass = "bg-blue-800/30 border-blue-700/50";
      } else {
        newBackground = "bg-gradient-to-br from-gray-900 to-black";
        newCardClass = "bg-gray-800/30 border-gray-700/50";
      }
    }

    setBackgroundClass(newBackground);
    setCardClass(newCardClass);
  }, [weather]);

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const extractHourFromTimeString = (timeString: string) => {
    return timeString.split(" ")[1].substring(0, 5);
  };

  // Fetch and display weather data
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${city}&days=7&aqi=no`
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
  }, [location]);

  const handleSearch = () => {
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  // Get hourly forecast for the current day
  const getHourlyForecast = () => {
    if (!weather?.forecast?.forecastday?.[0]?.hour) return [];

    const now = new Date();
    const currentHour = now.getHours();
    const hoursToShow = 8;

    const hourlyData = [];

    for (let i = 0; i < hoursToShow; i++) {
      const hourIndex = currentHour + i;
      if (hourIndex >= 24) break;

      const hourData = weather.forecast.forecastday[0].hour[hourIndex];
      if (!hourData) continue;

      hourlyData.push({
        time: extractHourFromTimeString(hourData.time),
        temp: Math.round(hourData.temp_c),
        icon: hourData.condition.icon,
        condition: hourData.condition.text,
        precipitation: hourData.precip_mm,
        humidity: hourData.humidity,
        wind: hourData.wind_kph,
      });
    }

    return hourlyData;
  };

  const hourlyForecast = getHourlyForecast();

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-4 transition-colors duration-1000 ${backgroundClass} text-white`}
    >
      <Card
        className={`w-full max-w-4xl backdrop-blur-sm shadow-xl transition-colors duration-1000 ${cardClass}`}
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Weatherly - Your Weather Reporter
          </CardTitle>
          <div className="text-sm text-gray-300 mt-1">
            {weather?.location?.name || "Loading..."},{" "}
            {formatDate(weather?.location?.localtime)} -{" "}
            {formatTime(weather?.location?.localtime)}
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 md:p-6">
          {/* Current Weather */}
          <div className="col-span-1 md:col-span-3">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <div className="flex-1">
                <div className="text-5xl md:text-7xl font-bold">
                  {weather?.current?.temp_c
                    ? Math.round(weather.current.temp_c)
                    : "--"}
                  °C
                </div>
                <div className="text-xl md:text-2xl capitalize">
                  {weather?.current?.condition?.text || "Loading..."}
                </div>
                <div className="text-sm text-gray-300 mt-2">
                  Wind:{" "}
                  {weather?.current?.wind_kph
                    ? Math.round(weather.current.wind_kph)
                    : "--"}{" "}
                  km/h | Humidity: {weather?.current?.humidity || "--"}% | UV:{" "}
                  {weather?.current?.uv || "--"}
                </div>
              </div>
              <div className="w-32 h-32 flex items-center justify-center">
                {weather?.current?.condition?.icon ? (
                  <Image
                    src={`https:${weather.current.condition.icon.replace(
                      "64x64",
                      "128x128"
                    )}`}
                    alt={weather.current.condition.text}
                    width={128}
                    height={128}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700/50 rounded-full"></div>
                )}
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Hourly Forecast</h3>
              <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {hourlyForecast.length > 0 ? (
                  hourlyForecast.map((hour, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center min-w-[80px] bg-gray-700/50 rounded-lg p-2"
                    >
                      <div className="text-xs font-medium">{hour.time}</div>
                      {hour.icon && (
                        <Image
                          src={`https:${hour.icon}`}
                          alt={hour.condition}
                          width={32}
                          height={32}
                          className="w-8 h-8 my-1"
                        />
                      )}
                      <div className="text-lg font-bold">{hour.temp}°C</div>
                      <div className="text-xs text-gray-300">
                        {hour.precipitation > 0
                          ? `💧 ${hour.precipitation}mm`
                          : ""}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex space-x-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center min-w-[80px] bg-gray-700/50 rounded-lg p-2 animate-pulse"
                      >
                        <div className="h-4 bg-gray-600/50 rounded w-12 mb-2"></div>
                        <div className="w-8 h-8 bg-gray-600/50 rounded-full my-1"></div>
                        <div className="h-6 bg-gray-600/50 rounded w-8"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Weekly Forecast */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
            <div className="space-y-3">
              {weather?.forecast?.forecastday?.map((day, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm bg-gray-700/30 rounded-lg p-2"
                >
                  <span className="font-medium">
                    {formatDate(day.date).split(",")[0]}
                  </span>
                  <div className="flex items-center gap-2">
                    {day.day?.condition.icon && (
                      <Image
                        src={`https:${day.day.condition.icon}`}
                        alt={day.day.condition.text}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    )}
                    <span className="font-bold">
                      {day.day?.maxtemp_c
                        ? Math.round(day.day.maxtemp_c)
                        : "--"}
                      °C
                    </span>
                  </div>
                </div>
              )) ||
                Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between text-sm bg-gray-700/30 rounded-lg p-2 animate-pulse"
                  >
                    <span className="h-4 bg-gray-600/50 rounded w-16"></span>
                    <span className="h-4 bg-gray-600/50 rounded w-8"></span>
                  </div>
                ))}
            </div>
          </div>

          {/* Search */}
          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location" className="text-gray-300">
                Location
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder="Enter a city"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-gray-700/80 text-white border-gray-600 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center">
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
