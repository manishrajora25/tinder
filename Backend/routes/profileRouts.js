import express from "express";
import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
import checkToken from "../middleware/checkToken.js";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

router.post("/add", checkToken, upload.single("image"), createOrUpdateProfile);
router.get("/", checkToken, getProfiles);

export default router;
