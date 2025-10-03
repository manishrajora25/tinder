

import express from "express";
import multer from "multer";
import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
import checkToken from "../middleware/checkToken.js";

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

/**
 * @swagger
 * /profile/create:
 *   post:
 *     summary: Create or update a profile
 *     tags:
 *       - Profiles
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *               bio:
 *                 type: string
 *                 description: Short bio of the user
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Profile image file
 *     responses:
 *       200:
 *         description: Profile created or updated successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       400:
 *         description: Bad request
 */
router.post("/create", checkToken, upload.single("image"), createOrUpdateProfile);

/**
 * @swagger
 * /profile/all:
 *   get:
 *     summary: Get all profiles
 *     tags:
 *       - Profiles
 *     responses:
 *       200:
 *         description: List of all profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   bio:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 */
router.get("/all", getProfiles);

export default router;
