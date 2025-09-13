import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Thermometer, Droplets, Wind } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy"
  humidity: number
  windSpeed: number
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: "sunny" | "cloudy" | "rainy"
  }>
}

interface WeatherWidgetProps {
  weather: WeatherData
}

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition) {
    case "sunny":
      return <Sun className="h-6 w-6 text-yellow-500" />
    case "cloudy":
      return <Cloud className="h-6 w-6 text-gray-500" />
    case "rainy":
      return <CloudRain className="h-6 w-6 text-blue-500" />
    default:
      return <Sun className="h-6 w-6" />
  }
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <Card data-testid="card-weather">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="h-5 w-5" />
          Weather - {weather.location}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WeatherIcon condition={weather.condition} />
            <span className="text-3xl font-bold" data-testid="text-temperature">
              {weather.temperature}°C
            </span>
          </div>
          <div className="text-right text-muted-foreground">
            <div className="flex items-center gap-1">
              <Droplets className="h-4 w-4" />
              <span data-testid="text-humidity">{weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Wind className="h-4 w-4" />
              <span data-testid="text-wind">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold mb-2">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-2">
            {weather.forecast.map((day, index) => (
              <div key={index} className="text-center text-sm" data-testid={`forecast-${index}`}>
                <div className="font-medium">{day.day}</div>
                <WeatherIcon condition={day.condition} />
                <div className="text-xs text-muted-foreground">
                  {day.high}° / {day.low}°
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}