import express from "express";
import {
  getAllBlogs,
  createBlog,
  getBlog,
  createComment,
} from "../controllers/blog.controller.js";
const router = express.Router();
router.get("/all", getAllBlogs);
router.get("/:id", getBlog);
router.post("/:id", createBlog);
router.post("/comment/:id", createComment);
export default router;
