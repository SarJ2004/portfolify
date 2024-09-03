import { getUser } from "../services/auth.service.js";

function checkForAuthentication(req, res, next) {
  const tokenFromCookies = req.cookies?.token;
  const tokenFromHeaders = req.headers.authorization?.split(" ")[1];

  console.log("Token from cookies:", tokenFromCookies);
  console.log("Token from headers:", tokenFromHeaders);

  const token = tokenFromCookies || tokenFromHeaders;
  req.user = null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const user = getUser(token);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user; // Attach user information to the request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    console.error("Error in token verification:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Token verification failed" });
  }
}

export { checkForAuthentication };
