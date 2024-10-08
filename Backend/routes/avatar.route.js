import express from "express";
import { avatarUpload } from "../middlewares/multer.js";
import { uploadAvatar } from "../controllers/avatar.controller.js";

const router = express.Router();

router.post("/:id", avatarUpload.single("avatar"), uploadAvatar);

export default router;
