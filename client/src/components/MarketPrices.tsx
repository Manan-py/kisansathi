import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, RefreshCw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useLanguage } from "@/contexts/LanguageContext"

interface PriceData {
  crop: string
  currentPrice: number
  previousPrice: number
  unit: string
  marketLocation: string
  lastUpdated: string
  trend: "up" | "down" | "stable"
  prediction: {
    nextWeek: number
    nextMonth: number
    recommendation: "buy" | "sell" | "hold"
  }
  priceHistory: Array<{
    date: string
    price: number
  }>
}

interface MarketPricesProps {
  prices: PriceData[]
}

export function MarketPrices({ prices }: MarketPricesProps) {
  const { t } = useLanguage()
  
  const handleRefreshPrices = () => {
    console.log('Refreshing market prices...')
  }

  const getVariantForRecommendation = (recommendation: string) => {
    switch (recommendation) {
      case "buy": return "default"
      case "sell": return "secondary"
      case "hold": return "outline"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6" data-testid="container-market-prices">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t("market.title")}
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRefreshPrices}
              data-testid="button-refresh-prices"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("market.refresh")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {prices.map((item, index) => (
              <Card key={index} data-testid={`card-price-${item.crop.toLowerCase().replace(' ', '-')}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg" data-testid={`text-crop-${index}`}>
                        {item.crop}
                      </h3>
                      <p className="text-sm text-muted-foreground" data-testid={`text-market-${index}`}>
                        {item.marketLocation}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold" data-testid={`text-price-${index}`}>
                          ₹{item.currentPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          /{item.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {item.trend === "up" ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : item.trend === "down" ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : null}
                        <span 
                          className={`text-sm ${
                            item.trend === "up" 
                              ? "text-green-600" 
                              : item.trend === "down" 
                              ? "text-red-600" 
                              : "text-muted-foreground"
                          }`}
                          data-testid={`text-change-${index}`}
                        >
                          {item.trend === "up" ? "+" : item.trend === "down" ? "-" : ""}
                          {Math.abs(item.currentPrice - item.previousPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">{t("market.pricePrediction")}</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("market.nextWeek")}</span>
                          <span data-testid={`text-prediction-week-${index}`}>
                            ₹{item.prediction.nextWeek}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{t("market.nextMonth")}</span>
                          <span data-testid={`text-prediction-month-${index}`}>
                            ₹{item.prediction.nextMonth}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge 
                          variant={getVariantForRecommendation(item.prediction.recommendation)}
                          data-testid={`badge-recommendation-${index}`}
                        >
                          {t(`market.recommendation.${item.prediction.recommendation}`)}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">{t("market.priceTrend")}</h4>
                      <div className="h-24" data-testid={`chart-${index}`}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={item.priceHistory}>
                            <Line 
                              type="monotone" 
                              dataKey="price" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={false}
                            />
                            <XAxis dataKey="date" hide />
                            <YAxis hide />
                            <Tooltip 
                              formatter={(value) => [`₹${value}`, t("market.tooltipPrice")]}
                              labelFormatter={(label) => `${t("market.tooltipDate")} ${label}`}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                    {t("market.lastUpdated")} <span data-testid={`text-updated-${index}`}>{item.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}