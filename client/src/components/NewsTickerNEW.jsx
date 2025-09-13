import { useEffect, useState } from 'react';

export function NewsTicker() {
  const [newsItems] = useState([
    "🌾 New drought-resistant wheat variety developed by agricultural scientists",
    "📈 Government announces crop insurance scheme with 50% premium subsidy", 
    "🌱 Organic farming practices show 30% increase in crop yields",
    "🌧️ Monsoon forecast predicts above-normal rainfall this season",
    "💰 Market prices for rice and wheat expected to rise by 15%"
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          NEWS
        </div>
        <div className="flex-1 overflow-hidden">
          <div 
            className="text-green-800 dark:text-green-200 transition-transform duration-500 ease-in-out whitespace-nowrap"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            data-testid="news-ticker-content"
          >
            {newsItems.map((news, index) => (
              <span 
                key={index} 
                className="inline-block w-full text-lg font-medium px-4"
              >
                {news}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}