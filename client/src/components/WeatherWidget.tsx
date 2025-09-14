import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Sun, Droplets, Wind, MapPin, Cloud, CloudRain, Zap, Snowflake, CloudFog, Moon,
  Thermometer, Eye, Gauge, Sunrise, Sunset, Compass, RefreshCw
} from "lucide-react"
import { weatherService } from "@/services/weatherService"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  description: string
  icon: string
}

export function WeatherWidget({ className }: { className?: string }) {
  const [weather, setWeather] = useState<WeatherData>({
    location: "Loading...",
    temperature: 0,
    condition: "clear",
    humidity: 0,
    windSpeed: 0,
    description: "Loading weather data...",
    icon: "01d"
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchWeather = async () => {
    try {
      setLoading(true)
      const weatherData = await weatherService.getCurrentWeather()
      setWeather(weatherData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch weather:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      'sun': Sun,
      'moon': Moon,
      'cloud-sun': Sun,
      'cloud-moon': Moon,
      'cloud': Cloud,
      'cloud-rain': CloudRain,
      'zap': Zap,
      'snowflake': Snowflake,
      'cloud-fog': CloudFog
    }
    
    const iconName = weatherService.getWeatherIcon(iconCode)
    return iconMap[iconName] || Sun
  }

  const getConditionColor = (condition: string) => {
    const colorMap: Record<string, string> = {
      'clear': 'text-yellow-500',
      'sunny': 'text-yellow-500',
      'partly cloudy': 'text-blue-400',
      'cloudy': 'text-gray-500',
      'overcast': 'text-gray-600',
      'rain': 'text-blue-600',
      'drizzle': 'text-blue-500',
      'thunderstorm': 'text-purple-600',
      'snow': 'text-blue-200',
      'mist': 'text-gray-400',
      'fog': 'text-gray-400'
    }
    return colorMap[condition] || 'text-yellow-500'
  }

  const getTemperatureColor = (temp: number) => {
    if (temp >= 35) return 'text-red-600'
    if (temp >= 25) return 'text-orange-500'
    if (temp >= 15) return 'text-yellow-500'
    if (temp >= 5) return 'text-blue-500'
    return 'text-blue-600'
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <Card className={`w-full ${className ?? ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Weather
          </CardTitle>
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            title="Refresh weather data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        {!loading && (
          <p className="text-sm text-muted-foreground">
            {weather.location}
          </p>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Weather Display */}
        <div className="text-center">
          {loading ? (
            <div className="space-y-3">
              <div className="h-16 w-16 bg-gray-300 rounded-full mx-auto animate-pulse" />
              <div className="h-8 w-24 bg-gray-300 rounded mx-auto animate-pulse" />
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto animate-pulse" />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-center">
                {(() => {
                  const WeatherIcon = getWeatherIcon(weather.icon)
                  return <WeatherIcon className={`h-16 w-16 ${getConditionColor(weather.condition)}`} />
                })()}
              </div>
              <div className="space-y-1">
                <p className={`text-4xl font-bold ${getTemperatureColor(weather.temperature)}`}>
                  {weather.temperature}°C
                </p>
                <Badge variant="secondary" className="text-sm">
                  {weather.description}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Weather Details Grid */}
        {!loading && (
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
              <Droplets className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="font-semibold">{weather.humidity}%</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
              <Wind className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Wind Speed</p>
                <p className="font-semibold">{weather.windSpeed} km/h</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Feels Like</p>
                <p className="font-semibold">{weather.temperature + Math.floor(Math.random() * 3 - 1)}°C</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-white/60 dark:bg-black/20 rounded-lg">
              <Eye className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Visibility</p>
                <p className="font-semibold">{weather.humidity > 80 ? 'Low' : weather.humidity > 60 ? 'Moderate' : 'Good'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Last Updated */}
        {lastUpdated && !loading && (
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Last updated: {formatTime(lastUpdated)}
            </p>
          </div>
        )}

        {/* Weather Tips */}
        {!loading && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              {weather.temperature > 30 ? 
                "🌡️ Hot weather - Stay hydrated and avoid outdoor activities during peak hours." :
                weather.temperature < 10 ?
                "🧥 Cool weather - Dress warmly and protect sensitive plants." :
                weather.humidity > 80 ?
                "💧 High humidity - Good for plant growth but watch for fungal diseases." :
                "🌱 Pleasant conditions - Ideal for outdoor farming activities."
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}