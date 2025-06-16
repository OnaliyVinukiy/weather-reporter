export interface WeatherData {
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
      dewpoint_c?: number;
      dewpoint_f?: number;
      cloud?: number;
      gust_kph?: number;
      gust_mph?: number;
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
          daily_chance_of_rain?: number;
          daily_chance_of_snow?: number;
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