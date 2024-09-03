import express from "express";
import upload from "../middlewares/multer.js";
import { uploadAvatar } from "../controllers/avatar.controller.js"; // Ensure path is correct

const router = express.Router();

// Endpoint to upload avatar
router.post("/:id", upload.single("avatar"), uploadAvatar);

export default router;
