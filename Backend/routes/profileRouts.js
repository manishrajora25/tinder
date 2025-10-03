// import express from "express";
// import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
// import checkToken from "../middleware/checkToken.js";
// import upload from "../middleware/cloudinaryUpload.js";

// const router = express.Router();

// router.post("/add", checkToken, upload.single("image"), createOrUpdateProfile);
// router.get("/", checkToken, getProfiles);

// export default router;





// import express from "express";
// import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
// import checkToken from "../middleware/checkToken.js";
// import upload from "../middleware/cloudinaryUpload.js";

// const router = express.Router();

// router.post("/add", checkToken, upload.single("image"), createOrUpdateProfile);
// router.get("/", checkToken, getProfiles);

// export default router;





import express from "express";
import multer from "multer";
import { createOrUpdateProfile, getProfiles } from "../controllers/profileController.js";
import  checkToken  from "../middleware/checkToken.js";
 // JWT middleware

// Multer middleware (Cloudinary config already hogi)
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post("/create", checkToken, upload.single("image"), createOrUpdateProfile);
router.get("/all", getProfiles);

export default router;
