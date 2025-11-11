

// import express from "express";
// import { createPost, getAllPosts, getMyPosts, getOtherPosts } from "../controllers/postController.js";
// import upload from "../middleware/cloudinaryUpload.js";
// import checkToken from "../middleware/checkToken.js"; // verify token

// const router = express.Router();

// // ✅ Protected route - only logged in users can post
// // 🔐 Create post
// router.post("/add", checkToken, upload.array("images", 9), createPost);

// // 🌍 Feed: sabhi users ke posts (dusre ke bhi)
// router.get("/all", checkToken, getAllPosts);




// // 🧍 Sirf apne posts
// router.get("/my", checkToken, getMyPosts);

// // ❤️ Feed me dusre users ke posts
// router.get("/feed", checkToken, getOtherPosts);

// export default router;







import express from "express";
import {
  createPost,
  getAllPosts,
  getMyPosts,
  getOtherPosts,
  updatePost,
  deletePost,
  getUserPosts,
} from "../controllers/postController.js";
import upload from "../middleware/cloudinaryUpload.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

// 🔐 Create
router.post("/add", checkToken, upload.array("images", 9), createPost);

// 🔹 Get all
router.get("/all", checkToken, getAllPosts);

// 🔹 Get my posts
router.get("/my", checkToken, getMyPosts);

// 🔹 Get other users’ posts
router.get("/feed", checkToken, getOtherPosts);

// ✏️ Update post (PUT)
router.put("/update/:id", checkToken, upload.array("images", 9), updatePost);

// ❌ Delete post (DELETE)
router.delete("/delete/:id", checkToken, deletePost);


router.get("/user/:id", getUserPosts);

export default router;
