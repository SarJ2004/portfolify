import { Blog } from "../models/blog.model.js";

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
    res.status(201).json(savedBlog);
  } catch (error) {
    // Handle any errors that occur during the request
    res.status(500).json({ message: "Error creating blog", error });
  }
};
const getBlog = async (req, res) => {
  try {
    // Extract the blog ID from the request parameters
    const { id } = req.params;

    // Fetch the blog from the database by its ID
    const blog = await Blog.findById(id).populate("author", "name").exec();

    // Check if the blog was found
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Send the fetched blog as a response
    res.status(200).json(blog);
  } catch (error) {
    // Handle any errors that occur during the request
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

    // Create a new comment object
    const newComment = {
      user: mongoose.Types.ObjectId(userId), // User ID from the authenticated user
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
export { getAllBlogs, createBlog, getBlog, createComment };
