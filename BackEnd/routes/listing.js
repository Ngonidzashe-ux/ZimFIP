const express = require("express");
const Listing = require("../models/Listing");
const verifyToken = require("../middleware/auth");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const {
      price,
      priceUnit,
      quantity,
      unit,
      location,
      photos,
      paymentOptions,
      phoneNumber,
      harvestDate,
      farmerGrade,
    } = req.body;

    // Validate required fields
    if (
      !price ||
      !priceUnit ||
      !photos ||
      !quantity ||
      !unit ||
      !location ||
      !paymentOptions ||
      !harvestDate ||
      !farmerGrade
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate priceUnit and unit
    if (!["tonnes", "kgs", "bags"].includes(priceUnit)) {
      return res.status(400).json({ message: "Invalid price unit" });
    }
    if (!["tonnes", "kgs", "bags"].includes(unit)) {
      return res.status(400).json({ message: "Invalid quantity unit" });
    }

    // Validate price and quantity
    if (price < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    if (quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    // Validate location
    if (!location.province || !location.city) {
      return res.status(400).json({ message: "Missing location fields" });
    }

    // Validate paymentOptions
    if (
      !Array.isArray(paymentOptions) ||
      !paymentOptions.every((opt) => ["ecocash", "visa", "cash"].includes(opt))
    ) {
      return res.status(400).json({ message: "Invalid payment options" });
    }

    // Validate phoneNumber if ecocash is selected
    if (
      paymentOptions.includes("ecocash") &&
      (!phoneNumber || !/^\+263[0-9]{9}$/.test(phoneNumber))
    ) {
      return res.status(400).json({
        message:
          "Invalid or missing EcoCash phone number (e.g., +26377XXXXXXX)",
      });
    }

    // Validate farmerGrade (optional)
    if (
      farmerGrade &&
      !["Grade A", "Grade B", "Grade C"].includes(farmerGrade)
    ) {
      return res.status(400).json({ message: "Invalid farmer grade" });
    }

    // Check user is farmer
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "No permission to make a listing" });
    }

    // Placeholder for computer vision (aiGrade)
    let aiGrade = null;
    if (photos && photos.length > 0) {
      // TODO: Call computer vision API to set aiGrade
      aiGrade = "Grade B"; // Mock value
    }

    // Create listing
    const listing = new Listing({
      userId: req.userId,
      price,
      priceUnit,
      quantity,
      unit,
      location,
      photos,
      paymentOptions,
      phoneNumber,
      harvestDate: harvestDate ? new Date(harvestDate) : null,
      farmerGrade,
      aiGrade,
    });

    await listing.save();
    res
      .status(201)
      .json({ message: "Listing created", listingId: listing._id });
  } catch (error) {
    console.error("Listing creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", verifytoken, async (req, res) => {
  try {
    const listingId = req.body;
    const listing = Listing.findByIdAndDelete(listingId);
    if (!listing) {
      return res.status(400).json({ message: "Listing not found" });
    }
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "No permission to make a listing" });
    }
  } catch (error) {
    console.error("Listing creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/listings/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;

    // Check if listing exists and belongs to user
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "No permission to delete this listing" });
    }

    // Check if user exists and is farmer
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "No permission to delete this listing" });
    }

    // Delete listing
    await Listing.deleteOne({ _id: listingId });

    res.status(200).json({ message: "Listing deleted" });
  } catch (error) {
    console.error("Listing deletion error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/listings/:id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;
    const {
      price,
      priceUnit,
      quantity,
      unit,
      location,
      photos,
      paymentOptions,
      phoneNumber,
      harvestDate,
      farmerGrade,
    } = req.body;

    // Check if listing exists and belongs to user
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    if (listing.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "No permission to update this listing" });
    }

    // Check if user exists and is farmer
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "No permission to update this listing" });
    }

    // Validate provided fields
    if (price !== undefined && price < 0) {
      return res.status(400).json({ message: "Invalid price" });
    }
    if (priceUnit && !["tonnes", "kgs", "bags"].includes(priceUnit)) {
      return res.status(400).json({ message: "Invalid price unit" });
    }
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }
    if (unit && !["tonnes", "kgs", "bags"].includes(unit)) {
      return res.status(400).json({ message: "Invalid quantity unit" });
    }
    if (location && (!location.province || !location.city)) {
      return res.status(400).json({ message: "Missing location fields" });
    }
    if (
      paymentOptions &&
      (!Array.isArray(paymentOptions) ||
        !paymentOptions.every((opt) =>
          ["ecocash", "visa", "cash"].includes(opt)
        ))
    ) {
      return res.status(400).json({ message: "Invalid payment options" });
    }
    if (
      paymentOptions &&
      paymentOptions.includes("ecocash") &&
      (!phoneNumber || !/^\+263[0-9]{9}$/.test(phoneNumber))
    ) {
      return res
        .status(400)
        .json({
          message:
            "Invalid or missing EcoCash phone number (e.g., +26377XXXXXXX)",
        });
    }
    if (
      farmerGrade &&
      !["Grade A", "Grade B", "Grade C"].includes(farmerGrade)
    ) {
      return res.status(400).json({ message: "Invalid farmer grade" });
    }

    // Placeholder for computer vision (aiGrade)
    let aiGrade = listing.aiGrade;
    if (photos && photos.length > 0) {
      // TODO: Call computer vision API to set aiGrade
      aiGrade = "Grade B"; // Mock value
    }

    // Update listing
    const updateData = {
      price: price !== undefined ? price : listing.price,
      priceUnit: priceUnit || listing.priceUnit,
      quantity: quantity !== undefined ? quantity : listing.quantity,
      unit: unit || listing.unit,
      location: location || listing.location,
      photos: photos || listing.photos,
      paymentOptions: paymentOptions || listing.paymentOptions,
      phoneNumber: phoneNumber || listing.phoneNumber,
      harvestDate: harvestDate ? new Date(harvestDate) : listing.harvestDate,
      farmerGrade: farmerGrade || listing.farmerGrade,
      aiGrade,
    };

    const updatedListing = await Listing.findByIdAndUpdate(
      listingId,
      updateData,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Listing updated", listingId: updatedListing._id });
  } catch (error) {
    console.error("Listing update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
