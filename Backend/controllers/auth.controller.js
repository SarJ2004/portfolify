import { User } from "../models/user.model.js";
import { setUser } from "../services/auth.service.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = setUser(newUser);

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
      maxAge: 3600000 * 24,
      path: "/",
    });

    console.log(token);

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

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = setUser(user);

    res.cookie("token", token, {
      httpOnly: false,
      sameSite: "None",
      secure: true,
      maxAge: 3600000 * 24,
      path: "/",
    });

    console.log(token);

    return res
      .status(200)
      .json({ message: "Login successful", token, id: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export { handleUserSignup, handleUserLogin };
