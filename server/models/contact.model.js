import mongoose from "mongoose";
import crypto from "crypto";
const ContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    required: "firstName is required",
  },
  lastName: {
    type: String,
    trim: true,
    required: "lastName is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  mobilePhone: {
    type: String,
    trim: true,
    required: "mobile Phone is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", ContactSchema);
