import { connectToMongoDB } from "./connect.js";
import { authenticate } from "./middlewares/auth.middleware.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import attendanceRoute from "./routes/attendance.route.js";
import avatarRoute from "./routes/avatar.route.js";
import blogRoute from "./routes/blog.route.js";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

const app = express();
const corsOptions = {
  origin: "https://main--portfolify-client.netlify.app",
  credentials: true, // Allow cookies to be sent
};

// Use CORS with the specified options
app.use(cookieParser());
app.use(cors(corsOptions));
const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log(`Mongodb connected`))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use("/", authRoute);
app.use("/user", userRoute);
app.use("/attendance", attendanceRoute);
app.use("/avatar", avatarRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
