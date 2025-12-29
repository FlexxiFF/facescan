
import { GoogleGenAI, Type } from "@google/genai";
import { SkinAnalysis } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeSkinImage(base64Image: string): Promise<SkinAnalysis> {
  const model = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are an expert dermatological AI. 
    Analyze the user's face from the provided image and provide a comprehensive skin health report.
    Identify the skin type (Oily, Dry, Combination, Sensitive, Normal), core concerns (Acne, Redness, Fine Lines, Texture, etc.), 
    and provide a detailed, professional skincare routine.
    Include specific product categories (e.g., "Gentle Cleanser", "Niacinamide Serum").
    Suggest real YouTube search queries that would help the user find routines from dermatologists or skincare experts.
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { text: "Analyze my skin based on this image and provide a detailed report in JSON format." },
        { inlineData: { mimeType: "image/jpeg", data: base64Image } }
      ]
    },
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          skinType: { type: Type.STRING },
          concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
          hydratedLevel: { type: Type.NUMBER },
          oilinessLevel: { type: Type.NUMBER },
          sensitivityLevel: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          routine: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                action: { type: Type.STRING },
                description: { type: Type.STRING },
                productType: { type: Type.STRING }
              },
              required: ["time", "action", "description", "productType"]
            }
          },
          products: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                why: { type: Type.STRING }
              },
              required: ["category", "ingredients", "why"]
            }
          },
          videos: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                channel: { type: Type.STRING },
                searchQuery: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["title", "channel", "searchQuery", "description"]
            }
          }
        },
        required: ["skinType", "concerns", "hydratedLevel", "oilinessLevel", "sensitivityLevel", "summary", "routine", "products", "videos"]
      }
    }
  });

  return JSON.parse(response.text);
}
