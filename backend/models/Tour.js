import mongoose from "mongoose";

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  price: Number,
  startDate: Date,
  endDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

export default mongoose.model("Tour", tourSchema);
