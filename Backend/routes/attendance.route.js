import express from "express";
import {
  getAttendance,
  setAttendance,
} from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/:id", getAttendance);
router.post("/:id", setAttendance);

export default router;
