import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username field is required"],
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email field is required"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    banned:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true
  }
);

const AuthModel = mongoose.model("Auth", authSchema);

export default AuthModel;