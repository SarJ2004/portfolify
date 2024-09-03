import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  classesAttended: {
    type: Number,
    required: true,
    default: 0,
  },
  totalClasses: {
    type: Number,
    required: true,
    default: 0,
  },
});

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subjects: [subjectSchema],
  },
  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export { Attendance };
