import express from "express";
import multer from "multer";
import { createPost, getAllPosts } from "../controllers/postController.js";
import upload from "../middleware/cloudinaryUpload.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post upload and management APIs
 */

/**
 * @swagger
 * /post/upload:
 *   post:
 *     summary: Upload a new post with image
 *     description: Allows a user to upload a post containing title, description, and image.
 *     tags: [Posts]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               description:
 *                 type: string
 *                 example: This is my post description.
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *                 post:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 671f2a9cfeae23b16c7b9f22
 *                     title:
 *                       type: string
 *                       example: My First Post
 *                     description:
 *                       type: string
 *                       example: This is my post description
 *                     image:
 *                       type: string
 *                       example: uploads/172844983-photo.jpg
 *                     user:
 *                       type: string
 *                       example: 671f1c34e45c9b23d09e91f0
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized - token missing or invalid
 *       500:
 *         description: Server error
 */
router.post("/upload", upload.single("image"), createPost);

/**
 * @swagger
 * /post/all:
 *   get:
 *     summary: Get all uploaded posts
 *     description: Returns a list of all posts with title, description, image, and user info.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 671f2a9cfeae23b16c7b9f22
 *                   title:
 *                     type: string
 *                     example: My First Post
 *                   description:
 *                     type: string
 *                     example: This is my post description.
 *                   image:
 *                     type: string
 *                     example: uploads/172844983-photo.jpg
 *                   user:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 671f1c34e45c9b23d09e91f0
 *                       name:
 *                         type: string
 *                         example: Manish Rajora
 *                       email:
 *                         type: string
 *                         example: manish@example.com
 *       500:
 *         description: Server error
 */
router.get("/all", getAllPosts);
export default router;
