const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceUnit: {
      type: String,
      enum: ["tonnes", "kgs", "bags"],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      enum: ["tonnes", "kgs", "bags"],
      required: true,
    },
    location: {
      province: { type: String, required: true },
      city: { type: String, required: true },
    },
    photos: [
      {
        type: String, // URL to photo
      },
    ],
    paymentOptions: [
      {
        type: String,
        enum: ["ecocash", "visa", "cash"],
        required: true,
      },
    ],
    phoneNumber: {
      type: String, // Required if paymentOptions includes 'ecocash'
    },
    harvestDate: {
      type: Date,
    },
    farmerGrade: {
      type: String,
      enum: ["Grade A", "Grade B", "Grade C"], // Optional, farmer's input
      required: true,
    },
    aiGrade: {
      type: String,
      enum: ["Grade A", "Grade B", "Grade C"], // Optional, set by computer vision
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Listing", ListingSchema);
