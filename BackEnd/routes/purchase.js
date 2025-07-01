const express = require("express");
const Purchase = require("../models/Purchase");
const Listing = require("../models/Listing");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// POST /api/purchases
router.post("/", verifyToken, async (req, res) => {
  try {
    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "buyer") {
      return res.status(403).json({ message: "User is not authorized to buy" });
    }

    const { listingId, quantity, paymentOption } = req.body;
    if (!listingId || !quantity || !paymentOption) {
      return res.status(400).json({ message: "Missing required information" });
    }

    // Validate paymentOption
    if (!["ecocash", "visa", "cash"].includes(paymentOption)) {
      return res.status(400).json({ message: "Invalid payment option" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Validate payment option against listing
    if (!listing.paymentOptions.includes(paymentOption)) {
      return res
        .status(400)
        .json({ message: "Payment option not supported by listing" });
    }

    // Validate ecocashPhone for ecocash
    if (paymentOption === "ecocash" && !listing.phoneNumber) {
      return res
        .status(400)
        .json({ message: "Listing does not have an EcoCash phone number" });
    }

    // Validate quantity
    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      quantity > listing.quantity
    ) {
      return res
        .status(400)
        .json({ message: "Invalid quantity or exceeds stock" });
    }

    // Update listing quantity
    await Listing.findByIdAndUpdate(listingId, {
      $inc: { quantity: -quantity },
    });

    // Create purchase
    const purchase = new Purchase({
      buyerId: req.userId,
      sellerId: listing.userId,
      quantitySold: quantity,
      produceRef: listing.produceRef,
      transactionValue: quantity * listing.price,
      paymentOption,
      purchaseStatus: "pending",
    });

    await purchase.save();
    res.status(201).json({
      message: "Purchase created",
      purchaseId: purchase._id,
      status: "pending",
    });
  } catch (error) {
    console.error("Purchase creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/purchases/:id/confirm
router.put("/:id/confirm", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "User is not authorized to confirm payment" });
    }

    const purchaseId = req.params.id;
    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    if (purchase.sellerId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "No permission to confirm this purchase" });
    }

    if (purchase.purchaseStatus !== "pending") {
      return res
        .status(400)
        .json({ message: "Purchase is not in pending status" });
    }

    const updatedPurchase = await Purchase.findByIdAndUpdate(
      purchaseId,
      { purchaseStatus: "confirmed" },
      { new: true }
    );

    res.status(200).json({
      message: "Purchase confirmed",
      status: updatedPurchase.purchaseStatus,
    });
  } catch (error) {
    console.error("Purchase confirmation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
