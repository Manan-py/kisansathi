import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface NewsCardProps {
  news: NewsItem[]
}

export function NewsCard({ news }: NewsCardProps) {
  
  return (
    <Card data-testid="card-news">
      <CardHeader>
        <CardTitle>Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {news.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-b-0" data-testid={`news-${item.id}`}>
              <div className="flex justify-between items-start gap-2 mb-2">
                <Badge variant="secondary" data-testid={`badge-${item.category}`}>
                  {item.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span data-testid={`time-${item.id}`}>{item.publishedAt}</span>
                </div>
              </div>
              
              <h4 className="font-semibold text-sm mb-1" data-testid={`title-${item.id}`}>
                {item.title}
              </h4>
              
              <p className="text-sm text-muted-foreground mb-2" data-testid={`summary-${item.id}`}>
                {item.summary}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground" data-testid={`source-${item.id}`}>
                  {item.source}
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  data-testid={`button-read-${item.id}`}
                  onClick={() => console.log('Opening news article:', item.sourceUrl)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Read
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}