import { User } from "../models/user.model.js";
import mongoose from "mongoose";
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   console.log(typeof id);
    //   return res.status(400).json({ message: "Invalid user ID" });
    // }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export { getUserById, updateUserById };
