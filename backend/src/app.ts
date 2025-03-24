import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "../src/routes/chatRoutes";

dotenv.config();

const app: Application = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});