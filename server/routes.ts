import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAgriculturalAdvice, analyzePlantImage } from "./lib/gemini";
import multer from 'multer';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({ storage: multer.memoryStorage() });

// Helper function to map wttr.in weather codes to icon codes
function getWeatherIconFromWttr(weatherCode: string): string {
  const iconMap: Record<string, string> = {
    '113': '01d', // Clear/Sunny
    '116': '02d', // Partly Cloudy
    '119': '03d', // Cloudy
    '122': '04d', // Overcast
    '143': '50d', // Mist
    '176': '10d', // Patchy rain nearby
    '179': '13d', // Patchy snow nearby
    '182': '13d', // Patchy sleet nearby
    '185': '13d', // Patchy freezing drizzle nearby
    '200': '11d', // Thundery outbreaks nearby
    '227': '13d', // Blowing snow
    '230': '13d', // Blizzard
    '248': '50d', // Fog
    '260': '50d', // Freezing fog
    '263': '09d', // Patchy light drizzle
    '266': '09d', // Light drizzle
    '281': '09d', // Freezing drizzle
    '284': '09d', // Heavy freezing drizzle
    '293': '10d', // Patchy light rain
    '296': '10d', // Light rain
    '299': '10d', // Moderate rain at times
    '302': '10d', // Moderate rain
    '305': '10d', // Heavy rain at times
    '308': '10d', // Heavy rain
    '311': '13d', // Light freezing rain
    '314': '13d', // Moderate or heavy freezing rain
    '317': '13d', // Light sleet
    '320': '13d', // Moderate or heavy sleet
    '323': '13d', // Patchy light snow
    '326': '13d', // Light snow
    '329': '13d', // Patchy moderate snow
    '332': '13d', // Moderate snow
    '335': '13d', // Patchy heavy snow
    '338': '13d', // Heavy snow
    '350': '13d', // Ice pellets
    '353': '09d', // Light rain shower
    '356': '10d', // Moderate or heavy rain shower
    '359': '10d', // Torrential rain shower
    '362': '13d', // Light sleet showers
    '365': '13d', // Moderate or heavy sleet showers
    '368': '13d', // Light snow showers
    '371': '13d', // Moderate or heavy snow showers
    '374': '13d', // Light showers of ice pellets
    '377': '13d', // Moderate or heavy showers of ice pellets
    '386': '11d', // Patchy light rain with thunder
    '389': '11d', // Moderate or heavy rain with thunder
    '392': '11d', // Patchy light snow with thunder
    '395': '11d'  // Moderate or heavy snow with thunder
  };
  
  return iconMap[weatherCode] || '01d';
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Agricultural AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = await getAgriculturalAdvice(message);
      res.json({ response });
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  // Weather endpoint using free wttr.in API
  app.get("/api/weather", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      
      if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
      }

      // Using wttr.in API (free, no API key required)
      const response = await fetch(
        `https://wttr.in/${lat},${lon}?format=j1`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      const current = data.current_condition[0];
      const nearestArea = data.nearest_area[0];
      
      const weatherData = {
        location: `${nearestArea.areaName[0].value}, ${nearestArea.country[0].value}`,
        temperature: parseInt(current.temp_C),
        condition: current.weatherDesc[0].value.toLowerCase(),
        humidity: parseInt(current.humidity),
        windSpeed: parseInt(current.windspeedKmph),
        description: current.weatherDesc[0].value,
        icon: getWeatherIconFromWttr(current.weatherCode)
      };

      res.json(weatherData);
    } catch (error) {
      console.error('Weather API error:', error);
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  });

  // Weather forecast endpoint
  app.get("/api/weather/forecast", async (req, res) => {
    try {
      const { lat, lon } = req.query;
      
      if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
      }

      const response = await fetch(`https://wttr.in/${lat},${lon}?format=j1`);
      
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract forecast data (next 5 days)
      const forecast = data.weather.slice(0, 5).map((day: any, index: number) => {
        const date = new Date(day.date);
        const dayNames = ['Today', 'Tomorrow', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const dayName = index < 2 ? dayNames[index] : date.toLocaleDateString('en-US', { weekday: 'short' });
        
        return {
          day: dayName,
          high: parseInt(day.maxtempC),
          low: parseInt(day.mintempC),
          condition: day.hourly[6].weatherDesc[0].value, // Midday condition
          icon: getWeatherIconFromWttr(day.hourly[6].weatherCode),
          precipitation: parseInt(day.hourly[6].chanceofrain)
        };
      });

      res.json(forecast);
    } catch (error) {
      console.error('Weather forecast API error:', error);
      res.status(500).json({ error: "Failed to fetch weather forecast" });
    }
  });

  // Plant disease detection endpoint
  app.post("/api/analyze-plant", upload.single('image'), async (req: MulterRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
      }

      const imageBase64 = req.file.buffer.toString('base64');
      const mimeType = req.file.mimetype;

      const analysis = await analyzePlantImage(imageBase64, mimeType);
      res.json({ analysis });
    } catch (error) {
      console.error('Plant analysis API error:', error);
      res.status(500).json({ error: "Failed to analyze plant image" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}