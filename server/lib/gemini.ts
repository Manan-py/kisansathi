// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

import { GoogleGenAI } from "@google/genai";

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getAgriculturalAdvice(message: string): Promise<string> {
    try {
        const systemPrompt = `You are an expert agricultural AI assistant helping farmers with crop management, disease identification, weather planning, and sustainable farming practices. 

Key responsibilities:
- Provide practical, actionable farming advice
- Help identify crop diseases and suggest treatments
- Offer guidance on irrigation, fertilization, and crop rotation
- Share knowledge about sustainable and organic farming methods
- Assist with seasonal planning and harvest timing
- Recommend appropriate crops for different conditions
- Provide market insights and selling strategies

Always be helpful, accurate, and consider local farming conditions. Keep responses concise but informative.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: systemPrompt,
            },
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ],
        });

        return response.text || "I apologize, but I'm having trouble processing your request right now. Please try asking your agricultural question again.";
    } catch (error) {
        console.error('Gemini API error:', error);
        return "I'm currently experiencing technical difficulties. Please try your agricultural question again in a moment.";
    }
}

export async function analyzePlantImage(imageBase64: string, mimeType: string): Promise<string> {
    try {
        const systemPrompt = `You are an expert agricultural AI specializing in plant disease detection and crop health analysis. 

When analyzing plant images:
1. Identify the plant type if possible
2. Assess overall plant health
3. Look for signs of diseases, pests, or nutrient deficiencies
4. Provide specific treatment recommendations
5. Suggest preventive measures
6. Rate the severity (low, medium, high)

Be specific and actionable in your recommendations.`;

        const contents = [
            {
                inlineData: {
                    data: imageBase64,
                    mimeType: mimeType,
                },
            },
            `Analyze this plant image for diseases, health issues, and provide detailed treatment recommendations. Include:
            1. Plant identification (if possible)
            2. Health assessment
            3. Any diseases or problems detected
            4. Specific treatment steps
            5. Prevention advice
            6. Severity level`
        ];

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: systemPrompt,
            },
            contents: contents,
        });

        return response.text || "Unable to analyze the image. Please ensure the image is clear and shows the plant clearly.";
    } catch (error) {
        console.error('Gemini image analysis error:', error);
        return "I'm having trouble analyzing the image right now. Please try uploading the image again.";
    }
}