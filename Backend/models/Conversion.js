import mongoose from "mongoose";

const conversionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ["story", "chunks"],
      required: true,
    },
    generatedText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversion", conversionSchema);