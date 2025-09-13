import { WeatherWidget } from "@/components/WeatherWidget"
import { NewsCarousel } from "@/components/NewsCarousel"
import heroImage from "@assets/generated_images/Agricultural_dashboard_hero_background_56601aa9.png"

export default function Dashboard() {
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


  return (
    <div className="space-y-6" data-testid="page-dashboard">
      {/* Hero Section */}
      <div 
        className="relative h-32 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        <div className="relative h-full flex items-center px-6">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-2" data-testid="text-dashboard-title">
              Welcome to AgriTech
            </h1>
            <p className="text-white/90" data-testid="text-dashboard-subtitle">
              Your comprehensive agricultural management platform
            </p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="space-y-6">
        <NewsCarousel news={mockNews} />
        <WeatherWidget weather={mockWeather} />
      </div>
    </div>
  )
}