
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Fast AI Assistant response using Gemini Flash Lite
 */
export const getFastResponse = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-flash-lite-latest',
    contents: prompt,
    config: {
      systemInstruction: "You are an elite athletic coach providing quick, concise, and scientifically accurate health advice. Keep answers under 100 words.",
    },
  });
  return response.text || "I'm sorry, I couldn't process that.";
};

/**
 * Health Grounding using Google Maps and Search
 */
export const searchHealthLocations = async (query: string, latitude?: number, longitude?: number): Promise<{text: string, chunks: any[]}> => {
  const config: any = {
    tools: [{ googleMaps: {} }, { googleSearch: {} }],
  };

  if (latitude && longitude) {
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude,
          longitude
        }
      }
    };
  }

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: query,
    config,
  });

  return {
    text: response.text || "",
    chunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

/**
 * Image Analysis for Nutrition or Gear
 */
export const analyzeImage = async (base64Image: string, prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
  });
  return response.text || "Analysis failed.";
};

/**
 * Video Analysis for Form/Technique
 */
export const analyzeVideo = async (base64Video: string, prompt: string): Promise<string> => {
  // Note: For video in simple base64, usually we'd need to extract frames or use a file upload service.
  // In this demo context, we assume the base64 contains the data needed.
  // Using gemini-3-pro-preview for complex reasoning on video.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Video, mimeType: 'video/mp4' } },
        { text: prompt }
      ]
    },
  });
  return response.text || "Video analysis failed.";
};
