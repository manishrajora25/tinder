

// import express from "express";
// import multer from "multer";
// import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
// import checkToken from "../middleware/checkToken.js";

// const upload = multer({ storage: multer.memoryStorage() });

// const router = express.Router();

// /**
//  * @swagger
//  * /profile/create:
//  *   post:
//  *     summary: Create or update a profile
//  *     tags:
//  *       - Profiles
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               name:
//  *                 type: string
//  *                 description: Name of the user
//  *               bio:
//  *                 type: string
//  *                 description: Short bio of the user
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *                 description: Profile image file
//  *     responses:
//  *       200:
//  *         description: Profile created or updated successfully
//  *       401:
//  *         description: Unauthorized, token missing or invalid
//  *       400:
//  *         description: Bad request
//  */
// router.post("/create", checkToken, upload.single("image"), createOrUpdateProfile);

// /**
//  * @swagger
//  * /profile/all:
//  *   get:
//  *     summary: Get all profiles
//  *     tags:
//  *       - Profiles
//  *     responses:
//  *       200:
//  *         description: List of all profiles
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 type: object
//  *                 properties:
//  *                   name:
//  *                     type: string
//  *                   bio:
//  *                     type: string
//  *                   imageUrl:
//  *                     type: string
//  */
// router.get("/all", getProfiles);

// export default router;









import express from "express";
import { createOrUpdateProfile, getMyProfile, getProfiles,  updateProfile} from "../controllers/profileController.js";
import checkToken from "../middleware/checkToken.js";
import upload from "../middleware/cloudinaryUpload.js"; 

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
 *               bio:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               interests:
 *                 type: string
 *                 description: Comma-separated interests or JSON array
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile created or updated successfully
 *       400:
 *         description: Bad request
 */
router.post("/create", checkToken, upload.single("image"), createOrUpdateProfile);

router.put("/update/:id", checkToken, upload.single("image"), updateProfile);

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
 */
router.get("/all", getProfiles);

router.get("/me", checkToken, getMyProfile);

export default router;
