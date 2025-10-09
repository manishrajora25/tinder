import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !description || !image) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newPost = await Post.create({ title, description, image });
    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error("Post upload error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
