import { MarketPrices } from '../MarketPrices'

export default function MarketPricesExample() {
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
    }
  ]

  return <MarketPrices prices={mockPrices} />
}