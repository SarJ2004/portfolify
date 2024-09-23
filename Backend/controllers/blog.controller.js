import { Blog } from "../models/blog.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
// Controller to get all blogs
const getAllBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const blogs = await Blog.find().populate("author", "name").exec();

    // Send the fetched blogs as a response
    res.status(200).json(blogs);
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: "Error retrieving blogs", error });
  }
};
const createBlog = async (req, res) => {
  try {
    // Destructure the necessary fields from the request body
    const { title, content, author, tags, coverImage } = req.body;

    // Create a new blog instance with the provided data
    const newBlog = new Blog({
      title,
      content,
      author, // This should be the ObjectId of the user
      tags,
      coverImage,
    });

    // Save the new blog to the database
    const savedBlog = await newBlog.save();

    // Send the saved blog as a response
    // console.log(savedBlog._id);
    res.status(201).json({
      blogId: savedBlog._id, // Include blogId in the response
      ...savedBlog.toObject(), // Include the rest of the saved blog data
    });
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: "Error creating blog", error });
  }
};
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch the blog with populated author and comments.user
    const blog = await Blog.findById(id)
      .populate("author", "name avatar") // Populate author details
      .populate("comments.user", "name avatar") // Populate user details for comments
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
    return res.status(401).json({ message: "Unauthorized" }); // Return 401 if user is not authenticated
  }
  const { id } = req.params; // Blog post ID
  const { content } = req.body; // Comment content
  const userId = req.user._id; // Assuming you have user info in req.user from authentication middleware

  try {
    // Find the blog post by ID
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Find the user details
    const user = await User.findById(userId);

    // Create a new comment object
    const newComment = {
      user: {
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
      },
      content,
      createdAt: new Date(),
    };

    // Add the new comment to the blog's comments array
    blog.comments.push(newComment);

    // Save the blog post with the new comment
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
    const { userId, blogId } = req.params; // Assuming user ID is available in req.user

    const user = await User.findById(userId);

    // Check if the blog is already saved
    const isSaved = user.savedBlogs.includes(blogId);

    if (isSaved) {
      // Remove from saved blogs
      user.savedBlogs = user.savedBlogs.filter(
        (id) => id.toString() !== blogId
      );
    } else {
      // Add to saved blogs
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
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Fetch the user and populate savedBlogs with author details
    const user = await User.findById(userId).populate({
      path: "savedBlogs",
      populate: {
        path: "author",
        select: "name", // Include only the name field from the author
      },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return saved blog details with author names
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
