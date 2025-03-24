import axios from "axios";

const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;

export const getGeminiResponse = async (message: string): Promise<string> => {
  try {
    const response = await axios.post(
      GEMINI_API_URL!,
      {
        contents: [{ role: "user", parts: [{ text: message }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, // Use API key from .env
        },
      }
    );

    return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "I'm having trouble answering that.";
  }
};
