const express = require("express");
const Dispute = require("../models/Dispute");
const Listing = require("../models/Listing");
const Purchase = require("../models/Purchase");
const User = require("../models/User");
const AuditLog = require("../models/AuditLog");
const verifyToken = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// POST /api/disputes
router.post("/", verifyToken, async (req, res) => {
  try {
    const { listingId, purchaseId, accusedId, issue } = req.body;

    // Validate required fields
    if (!listingId || !accusedId || !issue) {
      return res
        .status(400)
        .json({
          message: "Missing required information (listingId, accusedId, issue)",
        });
    }

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "buyer" && user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only buyers or farmers can file disputes" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check accused user
    const accused = await User.findById(accusedId);
    if (!accused) {
      return res.status(400).json({ message: "Accused user not found" });
    }
    if (accused.role !== "buyer" && accused.role !== "farmer") {
      return res
        .status(400)
        .json({ message: "Accused must be a buyer or farmer" });
    }

    // Validate accused is related to listing or purchase
    if (purchaseId) {
      const purchase = await Purchase.findById(purchaseId);
      if (!purchase) {
        return res.status(404).json({ message: "Purchase not found" });
      }
      if (
        accusedId !== purchase.buyerId.toString() &&
        accusedId !== purchase.sellerId.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Accused not involved in purchase" });
      }
    } else if (accusedId !== listing.userId.toString()) {
      return res
        .status(400)
        .json({ message: "Accused not involved in listing" });
    }

    // Create dispute
    const dispute = new Dispute({
      complainantId: req.userId,
      listingId,
      purchaseId,
      accusedId,
      issue,
      resolution: "under review",
    });

    await dispute.save();
    res
      .status(201)
      .json({
        message: "Dispute created successfully",
        disputeId: dispute._id,
      });
  } catch (error) {
    console.error("Dispute creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/disputes/:id/resolve
router.put("/:id/resolve", verifyToken, async (req, res) => {
  try {
    const disputeId = req.params.id;
    const { status } = req.body;

    // Validate status
    if (!status || !["resolved", "dismissed"].includes(status)) {
      return res
        .status(400)
        .json({
          message:
            'Invalid or missing status (must be "resolved" or "dismissed")',
        });
    }

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can resolve disputes" });
    }

    // Check dispute
    const dispute = await Dispute.findById(disputeId);
    if (!dispute) {
      return res.status(404).json({ message: "Dispute not found" });
    }

    // Update dispute
    const updatedDispute = await Dispute.findByIdAndUpdate(
      disputeId,
      { resolution: status },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Dispute resolved", disputeId: updatedDispute._id });
  } catch (error) {
    console.error("Dispute resolution error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/listings/:id/photos/review
router.put("/listings/:id/photos/review", verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;
    const { approved } = req.body;

    // Validate input
    if (typeof approved !== "boolean") {
      return res
        .status(400)
        .json({
          message: "Missing or invalid approved field (must be true or false)",
        });
    }

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can review photos" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Log photo review
    const auditLog = new AuditLog({
      listingId,
      field: "photos",
      oldValue: listing.photos,
      newValue: approved ? listing.photos : [],
      changedBy: req.userId,
    });
    await auditLog.save();

    // Update listing photos (reject clears photos)
    if (!approved) {
      listing.photos = [];
      await listing.save();
    }

    res
      .status(200)
      .json({ message: `Photos ${approved ? "approved" : "rejected"}` });
  } catch (error) {
    console.error("Photo review error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/audit/listings/:id
router.get("/audit/listings/:id", verifyToken, async (req, res) => {
  try {
    const listingId = req.params.id;

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can view audit logs" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Fetch audit logs
    const auditLogs = await AuditLog.find({ listingId }).select(
      "field oldValue newValue createdAt"
    );
    res.status(200).json(auditLogs);
  } catch (error) {
    console.error("Audit log fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
