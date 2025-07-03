const express = require("express");
const Message = require("../models/Message");
const Listing = require("../models/Listing");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// POST /api/messages
router.post("/", verifyToken, async (req, res) => {
  try {
    const { listingId, text, recipientId } = req.body;

    // Validate input
    if (!listingId || !text || !recipientId) {
      return res.status(400).json({ message: "Missing required information" });
    }

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "buyer" && user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only buyers or farmers can send messages" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Determine recipient
    const targetRecipientId =
      user.role === "farmer" ? recipientId : listing.userId;

    const recipient = await User.findById(targetRecipientId);
    if (!recipient) {
      return res.status(400).json({ message: "Recipient not found" });
    }
    if (recipient.role !== "buyer" && recipient.role !== "farmer") {
      return res
        .status(400)
        .json({ message: "Recipient must be a buyer or farmer" });
    }

    // Validate sender-recipient relationship
    if (user.role === "farmer" && targetRecipientId === user._id.toString()) {
      return res.status(400).json({ message: "Cannot send message to self" });
    }
    if (
      user.role === "buyer" &&
      listing.userId.toString() !== targetRecipientId.toString()
    ) {
      return res
        .status(400)
        .json({ message: "Recipient must be the listing owner" });
    }

    // Create message
    const message = new Message({
      listingId,
      senderId: req.userId,
      recipientId: targetRecipientId,
      text,
    });

    await message.save();

    // Emit via WebSocket
    const io = req.app.get("io");
    io.to(`listing:${listingId}`).emit("message", {
      listingId,
      senderId: req.userId,
      recipientId: targetRecipientId,
      text,
      createdAt: message.createdAt,
    });

    res.status(201).json({ messageId: message._id });
  } catch (error) {
    console.error("Message creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/messages/:listingId
router.get("/:listingId", verifyToken, async (req, res) => {
  try {
    const { listingId } = req.params;

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "buyer" && user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only buyers or farmers can view messages" });
    }

    // Check listing
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Ensure user is involved in the listing
    if (user.role === "farmer" && listing.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "No permission to view messages for this listing" });
    }

    // Fetch messages
    const messages = await Message.find({ listingId })
      .populate("senderId", "name email")
      .populate("recipientId", "name email")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Message fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
