import mongoose from "mongoose";
import { Attendance } from "../models/attendance.model.js"; // Adjust the path as needed

// Function to get attendance data for a specific user
export const getAttendance = async (req, res) => {
  try {
    const { id } = req.params; // Destructure id from req.params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ID:", id); // Log invalid ID
      return res.status(400).json({ message: "Invalid ID" });
    }

    const attendance = await Attendance.findOne({ user: id }).populate(
      "user",
      "name email"
    );

    if (!attendance) {
      console.log("Attendance record not found for ID:", id); // Log record not found
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.error("Server error:", error); // Log server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Function to update or create attendance data for a specific user
export const setAttendance = async (req, res) => {
  try {
    const { id } = req.params; // Destructure id from req.params

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const { subjects } = req.body;

    if (!Array.isArray(subjects)) {
      return res.status(400).json({ message: "Subjects must be an array" });
    }

    // Update or create attendance record
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
