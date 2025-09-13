import { NewsCarousel } from '../NewsCarousel'

export default function NewsCarouselExample() {
  //todo: remove mock functionality
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
    },
    {
      id: "4",
      title: "Smart irrigation systems reduce water usage by 40%",
      summary: "New IoT-based irrigation technology is helping farmers optimize water usage while maintaining crop yield and quality.",
      category: "Technology",
      publishedAt: "2 days ago",
      sourceUrl: "https://example.com/news/4",
      source: "Tech Agriculture"
    }
  ]

  return <NewsCarousel news={mockNews} />
}