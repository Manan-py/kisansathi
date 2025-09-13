import { WeatherWidget } from '../WeatherWidget'

export default function WeatherWidgetExample() {
  //todo: remove mock functionality
  const mockWeather = {
    location: "Punjab, India",
    temperature: 28,
    condition: "sunny" as const,
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Mon", high: 30, low: 22, condition: "sunny" as const },
      { day: "Tue", high: 28, low: 20, condition: "cloudy" as const },
      { day: "Wed", high: 26, low: 18, condition: "rainy" as const },
      { day: "Thu", high: 29, low: 21, condition: "sunny" as const },
      { day: "Fri", high: 31, low: 23, condition: "cloudy" as const },
    ]
  }

  return <WeatherWidget weather={mockWeather} />
}