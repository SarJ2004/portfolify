import multer from "multer";
import cloudinary from "../config/cloudinary.config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "user_avatars",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_banners",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const avatarUpload = multer({ storage: avatarStorage });
const bannerUpload = multer({ storage: bannerStorage });

export { avatarUpload, bannerUpload };
