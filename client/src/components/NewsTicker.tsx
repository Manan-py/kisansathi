import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Newspaper, Play, Pause, FlaskConical, FileText, Leaf, Laptop, TrendingUp, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface NewsItem {
  id: string
  title: string
  summary: string
  category: string
  publishedAt: string
  sourceUrl: string
  source: string
}

interface NewsTickerProps {
  news: NewsItem[]
}

export function NewsTicker({ news }: NewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (news.length === 0 || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [news.length, isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length)
  }

  if (news.length === 0) return null

  const currentNews = news[currentIndex]

  return (
    <Card className="p-4 border-2 border-red-300 dark:border-red-800 bg-gray-50 dark:bg-neutral-900/40 shadow-sm hover:shadow-md transition-shadow" data-testid="card-news-ticker">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2" data-testid="text-news-header">
          <Newspaper className="h-5 w-5" />
          Agricultural News
          <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-300 px-2 py-0.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="h-11 w-11"
            aria-label="Previous news article"
            data-testid="button-news-previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="h-11 w-11"
            aria-label={isAutoPlaying ? "Pause auto-advance" : "Resume auto-advance"}
            data-testid="button-news-play-pause"
          >
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {currentIndex + 1} / {news.length}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="h-11 w-11"
            aria-label="Next news article"
            data-testid="button-news-next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3" aria-live="polite" aria-atomic="true">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className={`flex items-center gap-1 ${getCategoryStyle(currentNews.category)}`} data-testid={`badge-category-${currentNews.category.toLowerCase()}`}>
            {getCategoryIcon(currentNews.category)}
            {currentNews.category}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {currentNews.publishedAt}
          </span>
        </div>

        <h3 className="font-semibold text-lg leading-tight" data-testid="text-news-title">
          {currentNews.title}
        </h3>

        <p className="text-muted-foreground text-sm leading-relaxed" data-testid="text-news-summary">
          {currentNews.summary}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <span className="text-xs text-muted-foreground">
            {currentNews.source}
          </span>
          <a
            href={currentNews.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/80"
          >
            Read more
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <div className="flex gap-1 ml-auto" role="tablist" aria-label="News articles navigation">
            {news.map((_, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to news article ${index + 1} of ${news.length}`}
                className={`w-11 h-11 rounded-full transition-colors flex items-center justify-center hover-elevate active-elevate-2 ${
                  index === currentIndex ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => setCurrentIndex(index)}
                data-testid={`button-news-dot-${index}`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-primary-foreground' : 'bg-foreground/60'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}

function getCategoryIcon(category: string) {
  const iconMap: Record<string, any> = {
    'Research': <FlaskConical className="h-3 w-3" />,
    'Policy': <FileText className="h-3 w-3" />,
    'Sustainability': <Leaf className="h-3 w-3" />,
    'Technology': <Laptop className="h-3 w-3" />,
    'Market': <TrendingUp className="h-3 w-3" />,
  }
  return iconMap[category] || <Newspaper className="h-3 w-3" />
}

function getCategoryStyle(category: string) {
  const map: Record<string, string> = {
    'Research': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    'Policy': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'Sustainability': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'Technology': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'Market': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  }
  return map[category] || 'bg-muted'
}