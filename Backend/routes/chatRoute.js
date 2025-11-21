import express from "express";
import { getAllMessages, getMessages, getRecentChats, sendMessage } from "../controllers/chatController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// senderId & receiverId required
router.post("/add", sendMessage);
router.get("/get/message/:senderId/:receiverId", checkToken, getMessages);

router.get("/recent/:id", getRecentChats);





// LOAD ALL MESSAGES (sender ↔ receiver)
router.get("/all/:sid/:rid", getAllMessages);



export default router;
