const mongoose = require("mongoose");

const DisputeSchema = new mongoose.Schema(
  {
    complainantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    purchaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Purchase",
    },
    accusedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      enum: ["under review", "resolved", "dismissed"],
      required: true,
      default: "under review",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dispute", DisputeSchema);
