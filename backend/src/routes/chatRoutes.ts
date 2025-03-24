import express from "express";
import { chatController } from "../controllers/chatController";
const router = express.Router();

router.post("/", chatController) 

export default router;