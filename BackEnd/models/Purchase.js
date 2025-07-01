const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantitySold: {
      type: Number,
      required: true,
      min: 0,
    },
    produceRef: {
      type: String,
      required: true,
    },
    transactionValue: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentOption: {
      type: String,
      enum: ["ecocash", "visa", "cash"],
      required: true,
    },
    purchaseStatus: {
      type: String,
      enum: ["pending", "confirmed", "returned"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
