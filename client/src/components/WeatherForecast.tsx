import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Cloud, CloudRain, Zap, Snowflake, CloudFog, Moon, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"
import { weatherService } from "@/services/weatherService"

interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: string
  precipitation: number
}

interface WeatherForecastProps {
  className?: string
}

export function WeatherForecast({ className }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchForecast = async () => {
    try {
      setLoading(true)
      const forecastData = await weatherService.getWeatherForecast()
      setForecast(forecastData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch forecast:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchForecast()
  }, [])

  const getWeatherIcon = (iconCode: string) => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      '01d': Sun,
      '01n': Moon,
      '02d': Sun,
      '02n': Moon,
      '03d': Cloud,
      '03n': Cloud,
      '04d': Cloud,
      '04n': Cloud,
      '09d': CloudRain,
      '09n': CloudRain,
      '10d': CloudRain,
      '10n': CloudRain,
      '11d': Zap,
      '11n': Zap,
      '13d': Snowflake,
      '13n': Snowflake,
      '50d': CloudFog,
      '50n': CloudFog
    }
    
    return iconMap[iconCode] || Sun
  }

  const getConditionColor = (condition: string) => {
    const colorMap: Record<string, string> = {
      'Clear': 'text-yellow-500',
      'Partly Cloudy': 'text-blue-400',
      'Cloudy': 'text-gray-500',
      'Light Rain': 'text-blue-600',
      'Rain': 'text-blue-600',
      'Thunderstorm': 'text-purple-600',
      'Snow': 'text-blue-200',
      'Mist': 'text-gray-400',
      'Fog': 'text-gray-400'
    }
    return colorMap[condition] || 'text-yellow-500'
  }

  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            3-Days Forecast
          </CardTitle>
          <button
            onClick={fetchForecast}
            disabled={loading}
            className="p-1 rounded-full hover:bg-muted transition-colors"
            title="Refresh forecast data"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {loading ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/60 dark:bg-black/20 rounded-lg animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-12 bg-gray-300 rounded" />
                  <div className="h-6 w-6 bg-gray-300 rounded" />
                  <div className="h-4 w-20 bg-gray-300 rounded" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-8 bg-gray-300 rounded" />
                  <div className="h-4 w-12 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          forecast.map((day, index) => {
            const WeatherIcon = getWeatherIcon(day.icon)
            return (
              <div key={index} className="flex items-center justify-between p-2 bg-white/60 dark:bg-black/20 rounded-lg hover:bg-white/80 dark:hover:bg-black/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-medium text-green-800 dark:text-green-200 min-w-[60px]">
                    {day.day}
                  </div>
                  <WeatherIcon className={`h-5 w-5 ${getConditionColor(day.condition)}`} />
                  <div className="text-sm text-green-700 dark:text-green-300">
                    {day.condition}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded">
                    {day.precipitation}%
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-green-900 dark:text-green-100">
                      {day.high}°
                    </span>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      {day.low}°
                    </span>
                  </div>
                </div>
              </div>
            )
          })
        )}
        
        {lastUpdated && !loading && (
          <div className="text-center pt-2">
            <p className="text-xs text-green-600 dark:text-green-400">
              Updated: {lastUpdated.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
              })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
