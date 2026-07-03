import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePic: { type: String, default: "" }, //cloudinary image url
    profilePicPublicId: { type: String, default:null }, //cloudinary public_id for deletion
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    isLoggedIn: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },

    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      phoneno: { type: String },
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User",userSchema)
