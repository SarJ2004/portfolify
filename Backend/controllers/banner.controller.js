import { Blog } from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.config.js";

const uploadBanner = async (req, res) => {
  try {
    const { id } = req.params; // Extract blog ID from request parameters
    const blog = await Blog.findById(id); // Find the blog by ID

    if (!blog) return res.status(404).send("Blog not found");

    if (!req.file) return res.status(400).send("No file uploaded");

    // Upload image to Cloudinary
    console.log(req.file); // Log the uploaded file info for debugging
    const result = await cloudinary.uploader.upload(req.file.path); // Upload to Cloudinary

    // Update blog banner URL
    blog.coverImage = result.secure_url; // Get the URL of the uploaded image
    await blog.save(); // Save the updated blog

    // Respond with the new banner URL
    res.status(200).json({ coverImage: blog.coverImage });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send("Server error"); // Send a server error response
  }
};

export { uploadBanner };
