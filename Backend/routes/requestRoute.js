import express from "express";
import {
  sendRequest,
  getMyRequests,
  acceptRequest,
  rejectRequest,
  getSentRequests
} from "../controllers/requestController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router.post("/send", checkToken, sendRequest);
router.get("/received", checkToken, getMyRequests);
router.put("/accept/:id", checkToken, acceptRequest);
router.put("/reject/:id", checkToken, rejectRequest);


router.get("/sent", checkToken,  getSentRequests);


export default router;
