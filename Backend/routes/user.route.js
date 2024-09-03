import express from "express";
import { getUserById, updateUserById } from "../controllers/user.controller.js";
const router = express.Router();
router.get("/:id", getUserById);
router.patch("/:id", updateUserById);
export default router;
