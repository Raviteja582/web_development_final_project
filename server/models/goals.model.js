import mongoose from "mongoose";
const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: "Title is required",
  },
  amountRequired: {
    type: Number,
    min: 0,
    required: "Amount is required",
  },
  savedAmount: {
    type: Number,
    required: "Saved Amount is required",
  },
  timeline: {
    type: Date,
    required: "Timeline is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  recorded_by: { type: mongoose.Schema.ObjectId, ref: "User" },
});

export default mongoose.model("Goals", ExpenseSchema);
