import { User } from "../models/user.model.js";
import cloudinary from "../config/cloudinary.config.js";

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).send("User not found");

    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);

    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({ avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

export { uploadAvatar };
