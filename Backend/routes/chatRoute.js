import express from "express";
import { getMessages } from "../controllers/chatController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// senderId & receiverId required
router.get("/get/message/:senderId/:receiverId", checkToken, getMessages);

export default router;
