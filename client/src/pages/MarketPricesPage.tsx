import { MarketPrices } from "@/components/MarketPrices"

export default function MarketPricesPage() {
  //todo: remove mock functionality
  const mockPrices = [
    {
      crop: "Wheat",
      currentPrice: 2450,
      previousPrice: 2380,
      unit: "quintal",
      marketLocation: "Ludhiana Mandi",
      lastUpdated: "10 minutes ago",
      trend: "up" as const,
      prediction: {
        nextWeek: 2520,
        nextMonth: 2680,
        recommendation: "hold" as const
      },
      priceHistory: [
        { date: "Mon", price: 2350 },
        { date: "Tue", price: 2380 },
        { date: "Wed", price: 2420 },
        { date: "Thu", price: 2400 },
        { date: "Fri", price: 2450 }
      ]
    },
    {
      crop: "Rice", 
      currentPrice: 3200,
      previousPrice: 3350,
      unit: "quintal",
      marketLocation: "Chandigarh Mandi",
      lastUpdated: "15 minutes ago",
      trend: "down" as const,
      prediction: {
        nextWeek: 3150,
        nextMonth: 3100,
        recommendation: "sell" as const
      },
      priceHistory: [
        { date: "Mon", price: 3400 },
        { date: "Tue", price: 3350 },
        { date: "Wed", price: 3300 },
        { date: "Thu", price: 3250 },
        { date: "Fri", price: 3200 }
      ]
    },
    {
      crop: "Corn",
      currentPrice: 1850,
      previousPrice: 1820,
      unit: "quintal", 
      marketLocation: "Amritsar Mandi",
      lastUpdated: "20 minutes ago",
      trend: "up" as const,
      prediction: {
        nextWeek: 1900,
        nextMonth: 1950,
        recommendation: "buy" as const
      },
      priceHistory: [
        { date: "Mon", price: 1800 },
        { date: "Tue", price: 1820 },
        { date: "Wed", price: 1830 },
        { date: "Thu", price: 1840 },
        { date: "Fri", price: 1850 }
      ]
    }
  ]

  return (
    <div className="space-y-6" data-testid="page-market-prices">
      <div>
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">
          Market Prices & Predictions
        </h1>
        <p className="text-muted-foreground" data-testid="text-page-description">
          Track current market prices and get AI-powered predictions for your crops
        </p>
      </div>
      <MarketPrices prices={mockPrices} />
    </div>
  )
}