import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getAgriculturalAdvice, analyzePlantImage } from "./lib/gemini";
import multer from 'multer';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({ storage: multer.memoryStorage() });

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
