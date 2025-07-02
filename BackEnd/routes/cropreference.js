const express = require("express");
const CropReference = require("../models/CropReference");
const User = require("../models/User");
const verifyToken = require("../middleware/auth");
require("dotenv").config();

const router = express.Router();

// POST /api/crop-references/request
router.post("/request", verifyToken, async (req, res) => {
  try {
    const { cropName, description } = req.body;

    // Validate required fields
    if (!cropName || !description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only farmers can request crop references" });
    }

    // Create crop reference
    const referenceRequest = new CropReference({
      userId: req.userId,
      cropName,
      description,
      status: "created",
    });

    await referenceRequest.save();
    res.status(201).json({
      message: "Crop reference request created successfully",
      referenceRequestId: referenceRequest._id,
    });
  } catch (error) {
    console.error("Crop reference creation error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/crop-references
router.get("/", verifyToken, async (req, res) => {
  try {
    // Check user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.role !== "farmer") {
      return res
        .status(403)
        .json({ message: "Only farmers can view crop references" });
    }

    // Build query
    const { cropName } = req.query;
    const query = {};
    if (cropName) {
      query.cropName = cropName;
    }

    // Fetch crop references
    const cropReferences = await CropReference.find(query);

    res.status(200).json(cropReferences);
  } catch (error) {
    console.error("Crop reference fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/crop-references/:id/approve
router.put("/:id/approve", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const cropId = req.params.id;

    // Validate status
    if (!status || !["approved", "rejected"].includes(status)) {
      return res
        .status(400)
        .json({
          message:
            'Invalid or missing status (must be "approved" or "rejected")',
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
        .json({ message: "Only admins can approve or reject crop references" });
    }

    // Check crop reference
    const cropReference = await CropReference.findById(cropId);
    if (!cropReference) {
      return res.status(404).json({ message: "Crop reference not found" });
    }

    // Update status
    cropReference.status = status;
    await cropReference.save();

    res
      .status(200)
      .json({ cropId: cropReference._id, status: cropReference.status });
  } catch (error) {
    console.error("Crop reference approval error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
