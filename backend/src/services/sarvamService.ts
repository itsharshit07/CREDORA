import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SARVAM_API_URL = "https://api.sarvam.ai/v1"; 
const API_KEY = process.env.SARVAM_API_KEY; 

app.post("/translate", async (req: Request, res: Response) => {
  try {
    const { text, targetLanguage } = req.body;

    const response = await axios.post(
      `${SARVAM_API_URL}/translate`,
      { text, targetLanguage },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error: any) {
    console.error("Translation Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Translation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
