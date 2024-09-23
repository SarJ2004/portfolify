import express from "express";
import { avatarUpload } from "../middlewares/multer.js";
import { uploadAvatar } from "../controllers/avatar.controller.js"; // Ensure path is correct

const router = express.Router();

// Endpoint to upload avatar
router.post("/:id", avatarUpload.single("avatar"), uploadAvatar);

export default router;
