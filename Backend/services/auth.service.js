import pkg from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { sign, verify } = pkg;
const secret = process.env.JWT_SECRET;

const setUser = (user) => {
  return sign({ _id: user._id, role: user.role, email: user.email }, secret, {
    expiresIn: "1h",
  });
};

const getUser = (token) => {
  if (!token) return null;
  console.log("Token:", token);
  try {
    return verify(token, secret); // Correctly using verify here
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

export { setUser, getUser };
