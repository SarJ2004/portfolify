import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/user.model.js"; // Adjust the import to your user model file

const secret = process.env.JWT_SECRET; // Ensure this environment variable is set
console.log("Secret:", secret);
/**
 * Middleware to check for authentication.
 * Verifies the JWT token provided in the cookies or Authorization header.
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from cookies or Authorization header
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, secret);
    console.log("Decoded:", decoded);

    // Find the user associated with the token
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Attach user information to the request
    req.user = user;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res
      .status(401)
      .json({ message: "Unauthorized: Token verification failed" });
  }
};

export { authenticate };
