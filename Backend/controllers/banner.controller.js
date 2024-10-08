import { Blog } from "../models/blog.model.js";
import cloudinary from "../config/cloudinary.config.js";

const uploadBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).send("Blog not found");

    if (!req.file) return res.status(400).send("No file uploaded");

    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);

    blog.coverImage = result.secure_url;
    await blog.save();

    res.status(200).json({ coverImage: blog.coverImage });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export { uploadBanner };
