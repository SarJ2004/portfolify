import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlog,
  createComment,
  toggleSaveBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { bannerUpload } from "../middlewares/multer.js";
import { uploadBanner } from "../controllers/banner.controller.js";
import { User } from "../models/user.model.js";
import { Blog } from "../models/blog.model.js";

const router = express.Router();
router.get("/all", getAllBlogs);
router.get("/:id", getBlog);
router.post("/:id", createBlog);
router.post("/comment/:id", authenticate, createComment);
router.post("/banner/:id", bannerUpload.single("coverImage"), uploadBanner);
router.post("/:userId/save/:blogId", toggleSaveBlog);
router.get("/:userId/saved/:blogId", async (req, res) => {
  const { userId, blogId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSaved = user.savedBlogs.includes(blogId);
    res.json({ saved: isSaved });
  } catch (error) {
    console.error("Error fetching save status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to like a blog
router.post("/:blogId/likes", async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the likes count
    blog.likes += 1;
    await blog.save();

    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to dislike a blog
router.post("/:blogId/dislikes", async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment the dislikes count
    blog.dislikes += 1;
    await blog.save();

    res.status(200).json({ dislikes: blog.dislikes });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
