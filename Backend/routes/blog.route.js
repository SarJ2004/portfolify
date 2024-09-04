import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlog,
  createComment,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.get("/all", getAllBlogs);
router.get("/:id", getBlog);
router.post("/:id", createBlog);
router.post("/comment/:id", authenticate, createComment);
export default router;
