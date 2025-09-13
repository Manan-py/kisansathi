import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  publishedAt: string
  imageUrl?: string
  sourceUrl: string
  source: string
}

interface NewsCarouselProps {
  news: NewsItem[]
}

export function NewsCarousel({ news }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % news.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [news.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (news.length === 0) return null

  const currentItem = news[currentIndex]

  return (
    <Card className="relative overflow-hidden" data-testid="card-news-carousel">
      <CardContent className="p-0">
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/10 flex items-center p-6">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" data-testid={`badge-${currentItem.category}`}>
                {currentItem.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span data-testid={`time-${currentItem.id}`}>{currentItem.publishedAt}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold leading-tight" data-testid={`title-${currentItem.id}`}>
              {currentItem.title}
            </h3>
            
            <p className="text-muted-foreground text-sm line-clamp-2" data-testid={`summary-${currentItem.id}`}>
              {currentItem.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground" data-testid={`source-${currentItem.id}`}>
                {currentItem.source}
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => console.log('Opening news article:', currentItem.sourceUrl)}
                data-testid={`button-read-${currentItem.id}`}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Read More
              </Button>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSlide}
              className="h-8 w-8 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
              data-testid="button-prev-news"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={nextSlide}
              className="h-8 w-8 bg-background/20 hover:bg-background/40 backdrop-blur-sm"
              data-testid="button-next-news"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
            {news.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-primary/30 hover:bg-primary/50"
                }`}
                data-testid={`dot-${index}`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}