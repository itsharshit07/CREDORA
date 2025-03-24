import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const SARVAM_API_URL = "https://api.sarvam.ai"; 

const detectLanguage = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${SARVAM_API_URL}/detect`,
      { text },
      { headers: { Authorization: `Bearer ${SARVAM_API_KEY}` } }
    );
    return response.data.language; 
  } catch (error) {
    console.error("Language detection failed:", error);
    return "en"; 
  }
};

const translateText = async (text: string, targetLang: string): Promise<string> => {
  try {
    const response = await axios.post(
      `${SARVAM_API_URL}/translate`,
      { text, targetLang },
      { headers: { Authorization: `Bearer ${SARVAM_API_KEY}` } }
    );
    return response.data.translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    return text; 
  }
};

export const chatController = async (req: Request, res: Response): Promise<void> => {
  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Message cannot be empty" });
    return;
  }

  try {
    const userLang = await detectLanguage(message);
    const translatedMessage = userLang !== "en" ? await translateText(message, "en") : message;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: translatedMessage }] }],
    });

    const aiResponse =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No valid AI response";

    const finalResponse = userLang !== "en" ? await translateText(aiResponse, userLang) : aiResponse;

    res.status(200).json({ response: finalResponse });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Oops! Something went wrong with the AI." });
  }
};