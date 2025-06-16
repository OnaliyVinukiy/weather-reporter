import CloudyIcon from "../icons/CloudyIcon";
import MistIcon from "../icons/MistyIcon";
import MoonIcon from "../icons/MoonIcon";
import PartlyCloudyDayIcon from "../icons/PartlyCloudyDayIcon";
import PartlyCloudyNightIcon from "../icons/PartlyCloudyNightIcon";
import RainyIcon from "../icons/RainyIcon";
import SnowyIcon from "../icons/SnowyIcon";
import StormyIcon from "../icons/StormyIcon";
import SunnyIcon from "../icons/SunnyIcon";

// Map weather conditions to animated icons and colors
export const weatherIcons: {
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
      mistColor?: string;
      color?: string;
    }>;
    colors: {
      sunColor?: string;
      moonColor?: string;
      cloudColor?: string;
      dropColor?: string;
      snowflakeColor?: string;
      lightningColor?: string;
      mistColor?: string;
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
  mist_day: {
    component: MistIcon,
    colors: { cloudColor: "#9CA3AF", mistColor: "rgba(255, 255, 255, 0.7)" },
  },
  fog_day: {
    component: MistIcon,
    colors: { cloudColor: "#9CA3AF", mistColor: "rgba(255, 255, 255, 0.7)" },
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
  mist_night: {
    component: MistIcon,
    colors: { cloudColor: "#9CA3AF", mistColor: "rgba(200, 200, 200, 0.6)" },
  },
  fog_night: {
    component: MistIcon,
    colors: { cloudColor: "#9CA3AF", mistColor: "rgba(200, 200, 200, 0.6)" },
  },
};
