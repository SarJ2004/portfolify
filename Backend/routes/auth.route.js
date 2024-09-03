import express from "express";
const router = express.Router();
import {
  handleUserSignup,
  handleUserLogin,
} from "../controllers/auth.controller.js";
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

export default router;
