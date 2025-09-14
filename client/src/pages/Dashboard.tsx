import { Link } from "wouter"
import { MessageSquare, Camera, TrendingUp, Sprout, MapPin, Rocket, LifeBuoy, Phone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsTicker } from "@/components/NewsTicker"
import { WeatherWidget } from "@/components/WeatherWidget"
import { WeatherForecast } from "@/components/WeatherForecast"
import { useState, useEffect } from "react"
import { weatherService } from "@/services/weatherService"

export default function Dashboard() {
  const [weather, setWeather] = useState({
    location: "Loading...",
    temperature: 0,
    condition: "clear",
    humidity: 0,
    windSpeed: 0,
    description: "Loading weather data...",
    icon: "01d"
  })
  const [weatherLoading, setWeatherLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setWeatherLoading(true)
        const weatherData = await weatherService.getCurrentWeather()
        setWeather(weatherData)
      } catch (error) {
        console.error('Failed to fetch weather:', error)
        // Keep the loading state or set fallback data
      } finally {
        setWeatherLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const mockNews = [
    {
      id: "1",
      title: "New drought-resistant wheat variety developed",
      summary: "Scientists have developed a new wheat variety that can withstand prolonged dry conditions, potentially helping farmers adapt to climate change.",
      category: "Research",
      publishedAt: "2 hours ago",
      sourceUrl: "https://example.com/news/1",
      source: "Agricultural Times"
    },
    {
      id: "2", 
      title: "Government announces crop insurance scheme",
      summary: "The government has launched a new comprehensive crop insurance program to protect farmers against weather-related losses.",
      category: "Policy",
      publishedAt: "4 hours ago",
      sourceUrl: "https://example.com/news/2",
      source: "Farm News Daily"
    },
    {
      id: "3",
      title: "Organic farming practices show 30% yield increase",
      summary: "A recent study demonstrates that sustainable organic farming techniques can significantly improve crop yields while maintaining soil health.",
      category: "Sustainability",
      publishedAt: "1 day ago",
      sourceUrl: "https://example.com/news/3",
      source: "Green Agriculture"
    }
  ]

  const featureCards = [
    {
      title: "Talk to AgriBot",
      description: "Get AI-powered agricultural advice",
      icon: MessageSquare,
      path: "/chat",
      testId: "card-feature-chatbot"
    },
    {
      title: "Scan your Plant",
      description: "Detect plant diseases with AI",
      icon: Camera,
      path: "/disease-detection",
      testId: "card-feature-disease"
    },
    {
      title: "Market Prediction",
      description: "Check mandi prices and trends",
      icon: TrendingUp,
      path: "/market-prices",
      testId: "card-feature-market"
    },
    {
      title: "Soil & Crop Tips",
      description: "Track growth and get recommendations",
      icon: Sprout,
      path: "/plant-tracker",
      testId: "card-feature-tracker"
    }
  ]

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      {/* Welcome Section */}
      <div className="relative rounded-lg overflow-hidden mb-4 bg-gradient-to-r from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
        {/* Subtle pattern overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(16,185,129,0.15), transparent 40%), radial-gradient(circle at 80% 0%, rgba(5,150,105,0.15), transparent 45%)" }} />
        <div className="relative p-4">
          <div className="space-y-1">
            <h1 className="text-2xl lg:text-3xl font-bold text-green-900 dark:text-green-100" data-testid="text-welcome-title">
              Welcome, Farmer!
            </h1>
            <p className="text-green-700 dark:text-green-200 flex items-center gap-2" data-testid="text-location">
              <MapPin className="h-4 w-4" />
              {weather.location}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Section - full width, stretched columns */}
      <div className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4 w-full items-stretch">
          {/* Weather Widget */}
          <div className="flex-1 flex">
            <WeatherWidget className="h-full" />
          </div>
          
          {/* Right Column: Grid where Support spans Forecast+Video height */}
          <div className="flex-[1.3] grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-4 items-stretch">
            {/* 1) Forecast (left, row 1) */}
            <div className="">
              <WeatherForecast />
            </div>

            {/* 2) Support & Helplines (right, spans both rows) */}
            <div className="lg:row-span-2">
              <Card className="h-full overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-5 w-5" />
                    <CardTitle className="text-lg font-semibold">Support & Helplines</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-2 text-sm h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">Kisan Call Center</p>
                      <p className="text-sm text-muted-foreground">General agri help, 6am–10pm</p>
                    </div>
                    <a href="tel:18001801551" className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                      <Phone className="h-4 w-4" /> 1800-180-1551
                    </a>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">Agri Insurance Support</p>
                      <p className="text-sm text-muted-foreground">Claim assistance and queries</p>
                    </div>
                    <a href="tel:18002669780" className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                      <Phone className="h-4 w-4" /> 1800-266-9780
                    </a>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">Local NGO Connect</p>
                      <p className="text-sm text-muted-foreground">Training, seeds, subsidies</p>
                    </div>
                    <a href="https://www.naip.gov.in/ngo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-sm font-medium">
                      Visit Site
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 3) Educational Videos (left, row 2) */}
            <div className="">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Educational Videos
              </h2>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative">
                  <img 
                    src="https://img.youtube.com/vi/LGF33NN4B8U/maxresdefault.jpg" 
                    alt="Modern Farming Techniques for Better Yield"
                    className="w-full h-40 md:h-44 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                      <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-base mb-2 line-clamp-2">
                    Modern Farming Techniques for Better Yield
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn practical methods that can make daily farm work easier.
                  </p>
                  <a 
                    href="https://www.youtube.com/watch?v=LGF33NN4B8U" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                  >
                    Watch Now
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* News Section */}
      <div className="mb-4">
        <NewsTicker news={mockNews} />
      </div>

      {/* Main Feature Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2" data-testid="text-features-header">
          <Rocket className="h-5 w-5" />
          Quick Access
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureCards.map((card) => {
            const IconComponent = card.icon
            return (
              <Link key={card.path} href={card.path}>
                <Card 
                  className="h-full hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 border-2 hover:border-primary/20" 
                  data-testid={card.testId}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <CardTitle className="text-lg font-semibold leading-tight">
                          {card.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {card.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        Tap to access
                      </Badge>
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}