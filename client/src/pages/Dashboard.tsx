import { Link } from "wouter"
import { MessageSquare, Camera, TrendingUp, Sprout, Sun, Droplets, Wind, MapPin, Rocket } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NewsTicker } from "@/components/NewsTicker"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Dashboard() {
  const { t } = useLanguage()
  
  //todo: remove mock functionality
  const mockWeather = {
    location: "Punjab, India",
    temperature: 28,
    condition: "sunny" as const,
    humidity: 65,
    windSpeed: 12,
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

  const featureCards = [
    {
      title: t("features.chatbot"),
      description: t("features.chatbotDesc"),
      icon: MessageSquare,
      path: "/chat",
      testId: "card-feature-chatbot"
    },
    {
      title: t("features.diseaseDetection"),
      description: t("features.diseaseDetectionDesc"),
      icon: Camera,
      path: "/disease-detection",
      testId: "card-feature-disease"
    },
    {
      title: t("features.mandiPrice"),
      description: t("features.mandiPriceDesc"),
      icon: TrendingUp,
      path: "/market-prices",
      testId: "card-feature-market"
    },
    {
      title: t("features.plantTracker"),
      description: t("features.plantTrackerDesc"),
      icon: Sprout,
      path: "/plant-tracker",
      testId: "card-feature-tracker"
    }
  ]

  return (
    <div className="min-h-screen bg-background" data-testid="page-dashboard">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-6 rounded-lg mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-green-900 dark:text-green-100" data-testid="text-welcome-title">
              {t("dashboard.welcome")}, {t("dashboard.farmer")}!
            </h1>
            <p className="text-green-700 dark:text-green-200 flex items-center gap-2" data-testid="text-location">
              <MapPin className="h-4 w-4" />
              {mockWeather.location}
            </p>
          </div>
          
          {/* Current Weather Summary */}
          <Card className="lg:w-80 bg-white/50 dark:bg-black/20 border-green-200 dark:border-green-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t("dashboard.currentWeather")}</p>
                  <p className="text-2xl font-bold" data-testid="text-temperature">
                    {mockWeather.temperature}{t("dashboard.temperature")}
                  </p>
                </div>
                <Sun className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  <span>{mockWeather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Wind className="h-4 w-4" />
                  <span>{mockWeather.windSpeed} km/h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* News Ticker */}
      <div className="mb-6">
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