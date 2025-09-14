// Weather service using OpenWeatherMap API
interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  description: string
  icon: string
}

interface ForecastDay {
  day: string
  high: number
  low: number
  condition: string
  icon: string
  precipitation: number
}

interface OpenWeatherResponse {
  name: string
  main: {
    temp: number
    humidity: number
  }
  weather: Array<{
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
  }
  sys: {
    country: string
  }
}

class WeatherService {
  async getCurrentWeather(latitude?: number, longitude?: number): Promise<WeatherData> {
    try {
      // If no coordinates provided, try to get user's location
      if (!latitude || !longitude) {
        const coords = await this.getUserLocation()
        latitude = coords.latitude
        longitude = coords.longitude
      }

      const response = await fetch(
        `/api/weather?lat=${latitude}&lon=${longitude}`
      )

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }

      const data: WeatherData = await response.json()
      return data
    } catch (error) {
      console.error('Weather service error:', error)
      // Return fallback data
      return {
        location: "Location unavailable",
        temperature: 25,
        condition: "clear",
        humidity: 60,
        windSpeed: 10,
        description: "Weather data unavailable",
        icon: "01d"
      }
    }
  }

  private async getUserLocation(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => {
          console.error('Geolocation error:', error)
          // Fallback to a default location (Delhi, India)
          resolve({
            latitude: 28.6139,
            longitude: 77.2090
          })
        },
        {
          timeout: 10000,
          enableHighAccuracy: false
        }
      )
    })
  }

  async getWeatherForecast(latitude?: number, longitude?: number): Promise<ForecastDay[]> {
    try {
      if (!latitude || !longitude) {
        const coords = await this.getUserLocation();
        latitude = coords.latitude;
        longitude = coords.longitude;
      }
      
      const response = await fetch(`/api/weather/forecast?lat=${latitude}&lon=${longitude}`);
      if (!response.ok) {
        throw new Error(`Weather forecast API error: ${response.status}`);
      }
      const data: ForecastDay[] = await response.json();
      return data;
    } catch (error) {
      console.error('Weather forecast service error:', error);
      // Return mock data as fallback
      return [
        {
          day: "Today",
          high: 32,
          low: 24,
          condition: "Partly Cloudy",
          icon: "02d",
          precipitation: 20
        },
        {
          day: "Tomorrow",
          high: 30,
          low: 22,
          condition: "Light Rain",
          icon: "10d",
          precipitation: 60
        },
        {
          day: "Wed",
          high: 28,
          low: 20,
          condition: "Clear",
          icon: "01d",
          precipitation: 5
        },
        {
          day: "Thu",
          high: 31,
          low: 23,
          condition: "Cloudy",
          icon: "03d",
          precipitation: 15
        },
        {
          day: "Fri",
          high: 29,
          low: 21,
          condition: "Thunderstorm",
          icon: "11d",
          precipitation: 80
        }
      ];
    }
  }

  getWeatherIcon(iconCode: string): string {
    // Map OpenWeatherMap icon codes to Lucide React icons
    const iconMap: Record<string, string> = {
      '01d': 'sun', // clear sky day
      '01n': 'moon', // clear sky night
      '02d': 'cloud-sun', // few clouds day
      '02n': 'cloud-moon', // few clouds night
      '03d': 'cloud', // scattered clouds
      '03n': 'cloud',
      '04d': 'cloud', // broken clouds
      '04n': 'cloud',
      '09d': 'cloud-rain', // shower rain
      '09n': 'cloud-rain',
      '10d': 'cloud-rain', // rain day
      '10n': 'cloud-rain', // rain night
      '11d': 'zap', // thunderstorm
      '11n': 'zap',
      '13d': 'snowflake', // snow
      '13n': 'snowflake',
      '50d': 'cloud-fog', // mist
      '50n': 'cloud-fog'
    }
    
    return iconMap[iconCode] || 'sun'
  }
}

export const weatherService = new WeatherService()
