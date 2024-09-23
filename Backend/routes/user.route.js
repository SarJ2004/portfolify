import express from "express";
import { getUserById, updateUserById } from "../controllers/user.controller.js";
import { handleSaved } from "../controllers/blog.controller.js";
const router = express.Router();
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
router.get("/:userId/saved", handleSaved);
export default router;
