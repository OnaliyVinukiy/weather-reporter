"use client";
import { useState, useEffect } from "react";
import {
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  Moon,
  MapPin,
  Search,
  RefreshCw,
  Sun,
  CloudLightning,
  CloudRain,
  ThermometerSun,
  ThermometerSnowflake,
} from "lucide-react";

// Import animated icon components
import SunnyIcon from "./icons/SunnyIcon";
import CloudyIcon from "./icons/CloudyIcon";
import RainyIcon from "./icons/RainyIcon";
import SnowyIcon from "./icons/SnowyIcon";
import StormyIcon from "./icons/StormyIcon";
import MoonIcon from "./icons/MoonIcon";
import PartlyCloudyDayIcon from "./icons/PartlyCloudyDayIcon";
import PartlyCloudyNightIcon from "./icons/PartlyCloudyNightIcon";

interface WeatherData {
  location?: {
    name: string;
    country: string;
    localtime: string;
  };
  current?: {
    temp_c: number;
    temp_f: number;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    vis_km: number;
    uv: number;
    feelslike_c: number;
    condition: {
      text: string;
      icon: string;
    };
    is_day: number;
  };
  forecast?: {
    forecastday?: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avghumidity: number;
        maxwind_kph: number;
        totalprecip_mm: number;
        condition: {
          text: string;
          icon: string;
        };
        uv: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: {
          text: string;
          icon: string;
        };
        precip_mm: number;
        humidity: number;
        wind_kph: number;
        is_day: number;
      }>;
    }>;
  };
}

// Map weather conditions to animated icons and colors
const weatherIcons: {
  [key: string]: {
    component: React.FC<{
      size?: number;
      isDay?: boolean;
      sunColor?: string;
      moonColor?: string;
      cloudColor?: string;
      dropColor?: string;
      snowflakeColor?: string;
      lightningColor?: string;
      color?: string;
    }>;
    colors: {
      sunColor?: string;
      moonColor?: string;
      cloudColor?: string;
      dropColor?: string;
      snowflakeColor?: string;
      lightningColor?: string;
      color?: string;
    };
  };
} = {
  // Day conditions
  sunny: {
    component: SunnyIcon,
    colors: { color: "#FCD34D" },
  },
  clear: {
    component: SunnyIcon,
    colors: { color: "#FCD34D" },
  },
  "partly cloudy_day": {
    component: PartlyCloudyDayIcon,
    colors: { sunColor: "#FCD34D", cloudColor: "#9CA3AF" },
  },
  cloudy_day: {
    component: CloudyIcon,
    colors: { color: "#9CA3AF" },
  },
  overcast_day: {
    component: CloudyIcon,
    colors: { color: "#9CA3AF" },
  },
  rain_day: {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  drizzle_day: {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "light rain_day": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "moderate rain_day": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "heavy rain_day": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  snow_day: {
    component: SnowyIcon,
    colors: { cloudColor: "#9CA3AF", snowflakeColor: "#E0F2F7" },
  },
  sleet_day: {
    component: SnowyIcon,
    colors: { cloudColor: "#9CA3AF", snowflakeColor: "#E0F2F7" },
  },
  thunder_day: {
    component: StormyIcon,
    colors: { cloudColor: "#9CA3AF", lightningColor: "#FACC15" },
  },

  // Night conditions
  clear_night: {
    component: MoonIcon,
    colors: { color: "#BFDBFE" },
  },
  "partly cloudy_night": {
    component: PartlyCloudyNightIcon,
    colors: { moonColor: "#BFDBFE", cloudColor: "#9CA3AF" },
  },
  cloudy_night: {
    component: CloudyIcon,
    colors: { color: "#9CA3AF" },
  },
  overcast_night: {
    component: CloudyIcon,
    colors: { color: "#9CA3AF" },
  },
  rain_night: {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  drizzle_night: {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "light rain_night": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "moderate rain_night": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  "heavy rain_night": {
    component: RainyIcon,
    colors: { cloudColor: "#9CA3AF", dropColor: "#3BA8F6" },
  },
  snow_night: {
    component: SnowyIcon,
    colors: { cloudColor: "#9CA3AF", snowflakeColor: "#E0F2F7" },
  },
  sleet_night: {
    component: SnowyIcon,
    colors: { cloudColor: "#9CA3AF", snowflakeColor: "#E0F2F7" },
  },
  thunder_night: {
    component: StormyIcon,
    colors: { cloudColor: "#9CA3AF", lightningColor: "#FACC15" },
  },
};

// Component to render animated weather icons
const AnimatedWeatherIcon: React.FC<{
  condition: string;
  isDay: boolean;
  size?: number;
}> = ({ condition, isDay, size = 80 }) => {
  const normalizedCondition = condition.toLowerCase();
  let iconKey = "";

  if (
    normalizedCondition.includes("sunny") ||
    normalizedCondition.includes("clear")
  ) {
    iconKey = isDay ? "sunny" : "clear_night";
  } else if (normalizedCondition.includes("partly cloudy")) {
    iconKey = isDay ? "partly cloudy_day" : "partly cloudy_night";
  } else if (normalizedCondition.includes("cloud")) {
    iconKey = isDay ? "cloudy_day" : "cloudy_night";
  } else if (normalizedCondition.includes("overcast")) {
    iconKey = isDay ? "overcast_day" : "overcast_night";
  } else if (
    normalizedCondition.includes("rain") ||
    normalizedCondition.includes("drizzle")
  ) {
    iconKey = isDay ? "rain_day" : "rain_night";
  } else if (
    normalizedCondition.includes("snow") ||
    normalizedCondition.includes("sleet")
  ) {
    iconKey = isDay ? "snow_day" : "snow_night";
  } else if (normalizedCondition.includes("thunder")) {
    iconKey = isDay ? "thunder_day" : "thunder_night";
  }

  const { component: IconComponent, colors } =
    weatherIcons[iconKey] || weatherIcons.sunny;

  return <IconComponent size={size} isDay={isDay} {...colors} />;
};

// Weather Tips
const WeatherTips: React.FC<{
  weather: WeatherData | null;
  unit: "C" | "F";
}> = ({ weather, unit }) => {
  if (!weather || !weather.current) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center">
          Weather Tips
        </h3>
        <p className="text-white/80">Loading tips...</p>
      </div>
    );
  }

  const currentTemp =
    unit === "C" ? weather.current.temp_c : weather.current.temp_f;
  const humidity = weather.current.humidity;
  const uvIndex = weather.current.uv;
  const condition = weather.current.condition.text.toLowerCase();
  const isDay = weather.current.is_day === 1;

  const tips: { icon: React.ReactNode; text: string }[] = [];

  // Temperature based tips
  if (
    (currentTemp > 30 && unit === "C") ||
    (currentTemp > 86 && unit === "F")
  ) {
    tips.push({
      icon: <ThermometerSun size={20} className="text-red-400" />,
      text: "Stay hydrated! Drink plenty of water.",
    });
    tips.push({
      icon: <Sun size={20} className="text-yellow-400" />,
      text: "Seek shade during peak sun hours.",
    });
  } else if (
    (currentTemp < 10 && unit === "C") ||
    (currentTemp < 50 && unit === "F")
  ) {
    tips.push({
      icon: <ThermometerSnowflake size={20} className="text-blue-300" />,
      text: "Dress in layers to stay warm.",
    });
    tips.push({
      icon: <Wind size={20} className="text-blue-200" />,
      text: "Protect exposed skin from the cold wind.",
    });
  }

  // Condition based tips
  if (condition.includes("rain") || condition.includes("drizzle")) {
    tips.push({
      icon: <CloudRain size={20} className="text-blue-400" />,
      text: "Don't forget your umbrella or raincoat!",
    });
    tips.push({
      icon: <Droplets size={20} className="text-blue-400" />,
      text: "Drive carefully, roads might be slippery.",
    });
  }
  if (condition.includes("thunder") || condition.includes("storm")) {
    tips.push({
      icon: <CloudLightning size={20} className="text-yellow-300" />,
      text: "Stay indoors during thunderstorms.",
    });
    tips.push({
      icon: <CloudLightning size={20} className="text-yellow-300" />,
      text: "Avoid open fields and tall trees.",
    });
  }
  if (condition.includes("snow") || condition.includes("sleet")) {
    tips.push({
      icon: <SnowyIcon size={20} />,
      text: "Wear waterproof boots and warm clothing.",
    });
    tips.push({
      icon: <Droplets size={20} className="text-white" />,
      text: "Be cautious of icy patches on roads and sidewalks.",
    });
  }
  if (uvIndex >= 6 && isDay) {
    tips.push({
      icon: <Sun size={20} className="text-orange-400" />,
      text: "Apply sunscreen generously (SPF 30+).",
    });
    tips.push({
      icon: <Eye size={20} className="text-yellow-400" />,
      text: "Wear sunglasses and a wide-brimmed hat.",
    });
  }
  if (humidity > 70) {
    tips.push({
      icon: <Droplets size={20} className="text-cyan-400" />,
      text: "High humidity can make it feel hotter; stay cool.",
    });
  }
  if (weather.current.wind_kph > 30) {
    tips.push({
      icon: <Wind size={20} className="text-gray-300" />,
      text: "Strong winds: secure loose outdoor items.",
    });
  }

  // General tips
  if (tips.length === 0) {
    tips.push({
      icon: <Sun size={20} className="text-yellow-300" />,
      text: "Enjoy the weather!",
    });
    tips.push({
      icon: <RefreshCw size={20} className="text-white/80" />,
      text: "Check back for updates.",
    });
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center">
        <Sun className="mr-2" size={20} />
        Weather Tips
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-center text-white/80 text-sm">
            {tip.icon}
            <span className="ml-3">{tip.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home() {
  const [location, setLocation] = useState("Colombo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [searchInput, setSearchInput] = useState("");

  // Fetch weather data from API
  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError("");

    try {
      const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      if (!API_KEY) {
        throw new Error("Weather API Key is not configured.");
      }

      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
          city
        )}&days=7&aqi=no&alerts=no`
      );

      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(
            "City not found. Please check the spelling and try again."
          );
        } else if (response.status === 401) {
          throw new Error(
            "Invalid API key. Please check your WeatherAPI configuration."
          );
        } else if (response.status === 403) {
          throw new Error(
            "API key exceeded the allowed limit. Please check your subscription."
          );
        } else {
          throw new Error(
            "Failed to fetch weather data. Please try again later."
          );
        }
      }

      const data = await response.json();
      setWeather(data);
      setLocation(data.location.name);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Search for weather
  const handleSearch = async () => {
    if (searchInput.trim()) {
      await fetchWeather(searchInput.trim());
    }
  };

  // Handle key press in search
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Refresh current location weather
  const handleRefresh = () => {
    if (location) {
      fetchWeather(location);
    }
  };

  // Load default city on component mount
  useEffect(() => {
    fetchWeather("Colombo");
  }, []);

  const getBackgroundGradient = () => {
    if (!weather?.current) return "from-indigo-900 via-gray-800 to-slate-900";

    const isDay = weather.current.is_day === 1;
    const condition = weather.current.condition.text.toLowerCase();

    if (isDay) {
      if (condition.includes("sunny") || condition.includes("clear")) {
        return "from-amber-600 via-sky-800 to-blue-600";
      } else if (
        condition.includes("partly cloudy") ||
        condition.includes("cloud") ||
        condition.includes("overcast")
      ) {
        return "from-slate-600 via-gray-600 to-gray-800";
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        return "from-blue-600 via-blue-700 to-blue-800";
      } else if (condition.includes("snow") || condition.includes("sleet")) {
        return "from-blue-200 via-blue-300 to-blue-400";
      } else if (condition.includes("thunder")) {
        return "from-gray-700 via-gray-800 to-gray-900";
      }
      return "from-sky-300 via-blue-400 to-indigo-500";
    } else {
      if (condition.includes("clear")) {
        return "from-indigo-800 via-purple-700 to-slate-800";
      } else if (
        condition.includes("cloud") ||
        condition.includes("overcast")
      ) {
        return "from-slate-700 via-gray-800 to-black";
      } else if (condition.includes("rain") || condition.includes("drizzle")) {
        return "from-slate-800 via-blue-900 to-black";
      } else if (condition.includes("snow") || condition.includes("sleet")) {
        return "from-blue-700 via-blue-800 to-blue-900";
      } else if (condition.includes("thunder")) {
        return "from-gray-800 via-gray-900 to-black";
      }
      return "from-slate-800 via-purple-800 to-black";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getWeatherIcon = (
    condition: string,
    isDay: boolean,
    isLarge = false
  ) => {
    const size = isLarge ? 120 : 24;
    return (
      <AnimatedWeatherIcon condition={condition} isDay={isDay} size={size} />
    );
  };

  const getHourlyForecast = () => {
    if (!weather?.forecast?.forecastday?.[0]?.hour) return [];

    const now = new Date();
    const currentHour = now.getHours();

    return weather.forecast.forecastday[0].hour
      .slice(currentHour, currentHour + 12)
      .map((hour) => ({
        time:
          new Date(hour.time).getHours().toString().padStart(2, "0") + ":00",
        temp: Math.round(hour.temp_c),
        condition: hour.condition.text,
        icon: hour.condition.icon,
        precipitation: hour.precip_mm,
        isDay: hour.is_day === 1,
      }));
  };

  const currentTemp =
    unit === "C" ? weather?.current?.temp_c : weather?.current?.temp_f;
  const feelsLike =
    unit === "C"
      ? weather?.current?.feelslike_c
      : weather?.current?.feelslike_c
      ? (weather.current.feelslike_c * 9) / 5 + 32
      : null;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/4 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Weatherly
          </h1>
          <p className="text-xl text-white/80 font-light">
            Your Modern Weather Dashboard
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <MapPin
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for a city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all disabled:opacity-50"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !searchInput.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all"
            >
              {loading ? (
                <div className="animate-spin w-5 h-5 border-2 border-white/60 border-t-white rounded-full"></div>
              ) : (
                <Search size={20} className="text-white" />
              )}
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl text-red-200 text-center">
              <p className="font-medium">⚠️ {error}</p>
              {error.includes("API key") && (
                <p className="text-sm mt-2 text-red-300">
                  Get a free API key from{" "}
                  <a
                    href="https://www.weatherapi.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-white transition-colors"
                  >
                    WeatherAPI.com
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Main Weather Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Current Weather - Large Card */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center text-white/80 mb-2">
                    <MapPin size={20} className="mr-2" />
                    <span className="text-lg">
                      {weather?.location?.name}, {weather?.location?.country}
                    </span>
                  </div>
                  <div className="text-white/60">
                    {weather?.location?.localtime &&
                      formatDate(weather.location.localtime)}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setUnit(unit === "C" ? "F" : "C")}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all"
                  >
                    °{unit}
                  </button>
                  <button
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all disabled:opacity-50"
                    onClick={handleRefresh}
                    disabled={loading}
                    title="Refresh weather data"
                  >
                    <RefreshCw
                      size={20}
                      className={`text-white ${loading ? "animate-spin" : ""}`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="text-8xl md:text-9xl font-bold text-white mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-white/20 rounded-lg h-24 w-48"></div>
                    ) : (
                      `${currentTemp ? Math.round(currentTemp) : "--"}°`
                    )}
                  </div>
                  <div className="text-2xl text-white/80 capitalize mb-2">
                    {loading ? (
                      <div className="animate-pulse bg-white/20 rounded h-6 w-32"></div>
                    ) : (
                      weather?.current?.condition?.text || "Loading..."
                    )}
                  </div>
                  <div className="text-lg text-white/60">
                    {loading ? (
                      <div className="animate-pulse bg-white/20 rounded h-4 w-24"></div>
                    ) : (
                      `Feels like ${
                        feelsLike ? Math.round(feelsLike) : "--"
                      }°${unit}`
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {loading ? (
                    <div className="animate-pulse bg-white/20 rounded-full h-20 w-20"></div>
                  ) : (
                    weather?.current?.condition?.text &&
                    getWeatherIcon(
                      weather.current.condition.text,
                      weather.current.is_day === 1,
                      true
                    )
                  )}
                </div>
              </div>

              {/* Weather Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <Wind className="mx-auto mb-2 text-white/80" size={24} />
                  <div className="text-white/60 text-sm">Wind</div>
                  <div className="text-white font-semibold">
                    {weather?.current?.wind_kph
                      ? Math.round(weather.current.wind_kph)
                      : "--"}{" "}
                    km/h
                  </div>
                  <div className="text-white/60 text-xs">
                    {weather?.current?.wind_dir}
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <Droplets className="mx-auto mb-2 text-white/80" size={24} />
                  <div className="text-white/60 text-sm">Humidity</div>
                  <div className="text-white font-semibold">
                    {weather?.current?.humidity || "--"}%
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <Eye className="mx-auto mb-2 text-white/80" size={24} />
                  <div className="text-white/60 text-sm">Visibility</div>
                  <div className="text-white font-semibold">
                    {weather?.current?.vis_km || "--"} km
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <Gauge className="mx-auto mb-2 text-white/80" size={24} />
                  <div className="text-white/60 text-sm">Pressure</div>
                  <div className="text-white font-semibold">
                    {weather?.current?.pressure_mb || "--"} mb
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Highlights and Weather Tips */}
          <div className="space-y-6">
            {/* UV Index */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Sun className="mr-2" size={20} />
                UV Index
              </h3>
              <div className="text-4xl font-bold text-white mb-2">
                {weather?.current?.uv || "--"}
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      (weather?.current?.uv || 0) * 10,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <div className="text-white/60 text-sm mt-2">
                {(weather?.current?.uv || 0) <= 2
                  ? "Low"
                  : (weather?.current?.uv || 0) <= 5
                  ? "Moderate"
                  : (weather?.current?.uv || 0) <= 7
                  ? "High"
                  : "Very High"}
              </div>
            </div>

            {/* Sunrise & Sunset */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-6">
              <h3 className="text-white font-semibold mb-4">Sun & Moon</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sunrise className="mr-3 text-orange-400" size={20} />
                    <span className="text-white/80">Sunrise</span>
                  </div>
                  <span className="text-white font-semibold">
                    {weather?.forecast?.forecastday?.[0]?.astro?.sunrise ||
                      "--"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sunset className="mr-3 text-orange-600" size={20} />
                    <span className="text-white/80">Sunset</span>
                  </div>
                  <span className="text-white font-semibold">
                    {weather?.forecast?.forecastday?.[0]?.astro?.sunset || "--"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon className="mr-3 text-blue-300" size={20} />
                    <span className="text-white/80">Moon Phase</span>
                  </div>
                  <span className="text-white font-semibold">
                    {weather?.forecast?.forecastday?.[0]?.astro?.moon_phase ||
                      "--"}
                  </span>
                </div>
              </div>
            </div>

            {/* Weather Tips Card */}
            <WeatherTips weather={weather} unit={unit} />
          </div>
        </div>

        {/* Hourly Forecast */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 mb-8">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Hourly Forecast
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {getHourlyForecast().map((hour, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[100px] bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all"
              >
                <div className="text-white/80 font-medium mb-2">
                  {hour.time}
                </div>
                {getWeatherIcon(hour.condition, hour.isDay)}
                <div className="text-2xl font-bold text-white my-3">
                  {hour.temp}°
                </div>
                <div className="text-white/60 text-sm text-center">
                  {hour.condition}
                </div>
                {hour.precipitation > 0 && (
                  <div className="flex items-center text-blue-400 text-xs mt-2">
                    <Droplets size={12} className="mr-1" />
                    {hour.precipitation.toFixed(1)}mm
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Forecast*/}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">
            7-Day Forecast
          </h3>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {weather?.forecast?.forecastday?.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[140px] flex-shrink-0 bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all text-center"
              >
                <div className="text-white/80 font-medium mb-2">
                  {index === 0
                    ? "Today"
                    : new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "short",
                      })}
                </div>
                <div className="mb-3">
                  {getWeatherIcon(day.day.condition.text, true, false)}
                </div>
                <div className="text-white/60 text-sm mb-2 capitalize">
                  {day.day.condition.text}
                </div>
                <div className="text-white font-semibold">
                  <span className="text-xl">
                    {Math.round(day.day.maxtemp_c)}°
                  </span>
                  <span className="text-white/60 ml-2">
                    {Math.round(day.day.mintemp_c)}°
                  </span>
                </div>
                <div className="flex items-center text-blue-400 text-xs mt-2">
                  <Droplets size={12} className="mr-1" />
                  {day.day.totalprecip_mm.toFixed(1)}mm
                </div>
                <div className="flex items-center text-white/60 text-xs mt-1">
                  <Wind size={12} className="mr-1" />
                  {Math.round(day.day.maxwind_kph)}km/h
                </div>
              </div>
            )) ||
              Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[140px] flex-shrink-0 bg-white/5 rounded-2xl p-4 animate-pulse"
                >
                  <div className="h-6 bg-white/10 rounded w-20 mb-2"></div>
                  <div className="h-10 w-10 bg-white/10 rounded-full mb-3"></div>
                  <div className="h-4 bg-white/10 rounded w-24 mb-2"></div>
                  <div className="h-6 bg-white/10 rounded w-16"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
