import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Enter your firstname !"],
    maxLength: [50, "Your name cannot exceed more than 50 characters"],
  },
  name: {
    type: String,
    required: [true, "Enter your lastname !"],
    maxLength: [50, "Your name cannot exceed more than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter your email !"],
    unique: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Enter your password !"],
    minLength: [6, "Your password must do at least 6 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: null,
    },
    url: {
      type: String,
      required: true,
      default: null,
    },
  },
  role: {
    type: [String],
    enum: ["Subscriber", "Instructor", "Admin"],
    default: "User",
  },
  number: {
    type: String,
  },
  idcard: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpired: Date,
});

export default mongoose.models.User || mongoose.model("User", userSchema);
