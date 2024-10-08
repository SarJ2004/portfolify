import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/user.model.js";

const secret = process.env.JWT_SECRET;
console.log("Secret:", secret);
/**
 * Middleware to check for authentication.
 * Verifies the JWT token provided in the cookies or Authorization header.
 */
const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, secret);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ message: "Unauthorized: Token verification failed" });
  }
};

export { authenticate };
