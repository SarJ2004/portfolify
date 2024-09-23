import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary storage for user avatars
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_avatars",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Cloudinary storage for blog banners
const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_banners", // Specify the folder for blog banners
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

// Create two separate multer instances for avatars and banners
const avatarUpload = multer({ storage: avatarStorage });
const bannerUpload = multer({ storage: bannerStorage });

export { avatarUpload, bannerUpload };
