import { User } from "../models/user.model.js";
import { setUser } from "../services/auth.service.js";
import bcrypt from "bcrypt";

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate a JWT token
    const token = setUser(newUser);

    // Set the cookie with appropriate options
    res.cookie("token", token, {
      httpOnly: false, // Prevent access via JavaScript
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // Adjust for cross-origin
      secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    console.log(token);

    // Respond with success and the token
    return res
      .status(200)
      .json({ message: "Signup successful", token, id: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = setUser(user);

    // Set the cookie with appropriate options
    res.cookie("token", token, {
      httpOnly: false, // Prevent access via JavaScript
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Strict", // Adjust for cross-origin
      secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    console.log(token);

    // Respond with success and the token
    return res
      .status(200)
      .json({ message: "Login successful", token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export { handleUserSignup, handleUserLogin };
