import mongoose from "mongoose";
import { Attendance } from "../models/attendance.model.js";

export const getAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID:", id);
      return res.status(400).json({ message: "Invalid ID" });
    }

    const attendance = await Attendance.findOne({ user: id }).populate(
      "user",
      "name email"
    );

    if (!attendance) {
      console.log("Attendance record not found for ID:", id);
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const setAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const { subjects } = req.body;

    if (!Array.isArray(subjects)) {
      return res.status(400).json({ message: "Subjects must be an array" });
    }

    const attendance = await Attendance.findOneAndUpdate(
      { user: id },
      { $set: { subjects } },
      { new: true, upsert: true, runValidators: true }
    ).populate("user", "name email");

    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
