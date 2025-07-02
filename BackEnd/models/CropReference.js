const mongoose = require("mongoose");

const CropReferenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["created", "approved", "rejected"],
      required: true,
      default: "created",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CropReference", CropReferenceSchema);
