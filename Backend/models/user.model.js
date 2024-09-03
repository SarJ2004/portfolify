import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL",
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/",
    },
    bio: {
      type: String,
      default: "",
    },
    resume: {
      type: String,
      default: "",
    },
    currentGrade: {
      type: String,
      default: "",
    },
    codingProfiles: {
      leetCode: {
        type: String,
        default: "",
      },
      codeforces: {
        type: String,
        default: "",
      },
      geeksForGeeks: {
        type: String,
        default: "",
      },
    },
    savedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
