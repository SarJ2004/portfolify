import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name").exec();

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blogs", error });
  }
};
const createBlog = async (req, res) => {
  try {
    const { title, content, author, tags, coverImage } = req.body;

    const newBlog = new Blog({
      title,
      content,
      author,
      tags,
      coverImage,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      blogId: savedBlog._id,
      ...savedBlog.toObject(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error });
  }
};
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("author", "name avatar")
      .populate("comments.user", "name avatar")
      .exec();

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blog", error });
  }
};
const createComment = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params;
  const { content } = req.body;
  const userId = req.user._id;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const user = await User.findById(userId);

    const newComment = {
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      },
      content,
      createdAt: new Date(),
    };

    blog.comments.push(newComment);

    await blog.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "An error occurred while adding the comment",
      error,
    });
  }
};

const toggleSaveBlog = async (req, res) => {
  try {
    const { userId, blogId } = req.params;

    const user = await User.findById(userId);

    const isSaved = user.savedBlogs.includes(blogId);

    if (isSaved) {
      user.savedBlogs = user.savedBlogs.filter(
        (id) => id.toString() !== blogId
      );
    } else {
      user.savedBlogs.push(blogId);
    }

    await user.save();

    res.status(200).json({ saved: !isSaved });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

const handleSaved = async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(userId).populate({
      path: "savedBlogs",
      populate: {
        path: "author",
        select: "name",
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedBlogs);
  } catch (error) {
    console.error("Error fetching saved blogs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllBlogs,
  createBlog,
  getBlog,
  createComment,
  toggleSaveBlog,
  handleSaved,
};
