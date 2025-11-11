

// import Post from "../models/Post.js";
// import User from "../models/user.js"; // ✅ Capital "U" (ensure filename also matches)

// export const createPost = async (req, res) => {
//   try {
//     const { title, description } = req.body;
//     const files = req.files;
//     const imagePaths = files ? files.map((file) => file.path) : [];

//     if (!title || !description) {
//       return res.status(400).json({ message: "Title and description are required" });
//     }

//     if (imagePaths.length < 2 || imagePaths.length > 9) {
//       return res.status(400).json({
//         message: "Please upload between 2 and 9 images",
//       });
//     }

//     // ✅ Use user ID from token
//     const newPost = await Post.create({
//       userId: req.user._id,
//       title,
//       description,
//       images: imagePaths,
//     });

//     res.status(201).json({
//       success: true,
//       message: "✅ Post created successfully",
//       post: newPost,
//     });
//   } catch (err) {
//     console.error("❌ Post upload error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


// export const getAllPosts = async (req, res) => {
//   try {
//     // ✅ All posts in descending order (latest first)
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .populate("userId", "name email"); // user details from users collection

//     res.status(200).json({
//       success: true,
//       count: posts.length,
//       posts,
//     });
//   } catch (err) {
//     console.error("❌ Get posts error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };








// // ✅ Sirf current user ke posts
// export const getMyPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ success: true, posts });
//   } catch (err) {
//     console.error("❌ Get My Posts Error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ✅ Dusre users ke posts (feed)
// export const getOtherPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({ userId: { $ne: req.user._id } })
//       .sort({ createdAt: -1 })
//       .populate("userId", "name email");
//     res.status(200).json({ success: true, posts });
//   } catch (err) {
//     console.error("❌ Feed Error:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };














import Post from "../models/Post.js";
import User from "../models/user.js"; // ✅ Capital "U" (ensure filename also matches)

// 🟢 CREATE POST
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files;
    const imagePaths = files ? files.map((file) => file.path) : [];

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    if (imagePaths.length < 2 || imagePaths.length > 9) {
      return res.status(400).json({
        message: "Please upload between 2 and 9 images",
      });
    }

    const newPost = await Post.create({
      userId: req.user._id,
      title,
      description,
      images: imagePaths,
    });

    res.status(201).json({
      success: true,
      message: "✅ Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error("❌ Post upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 GET ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (err) {
    console.error("❌ Get posts error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 GET MY POSTS
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error("❌ Get My Posts Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟢 GET OTHER USERS’ POSTS
export const getOtherPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: { $ne: req.user._id } })
      .sort({ createdAt: -1 })
      .populate("userId", "name email");
    res.status(200).json({ success: true, posts });
  } catch (err) {
    console.error("❌ Feed Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// 🟡 UPDATE POST (PUT)
export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Authorization check
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Update text fields
    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;

    // ✅ If new files uploaded, append them (keep old ones)
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map((file) => file.path);
      post.images = [...post.images, ...newImages].slice(0, 9); // 👈 combine + limit 9
    }

    await post.save();

    res.status(200).json({
      success: true,
      message: "✅ Post updated successfully",
      post,
    });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// 🔴 DELETE POST
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    // ✅ Only owner can delete
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "🗑️ Post deleted successfully" });
  } catch (err) {
    console.error("❌ Delete Post Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};









// ✅ Get all posts of a specific user
export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    
    // ⚠️ Yahan `user` nahi, `userId` likho
    const posts = await Post.find({ userId: id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.error("❌ Error fetching user posts:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user posts",
    });
  }
};
