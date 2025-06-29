const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const verifyToken = require("../middleware/auth");
dotenv.config();

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, role, name, location, buyerType } = req.body;

    if (
      !email ||
      !password ||
      !role ||
      !name ||
      !location?.province ||
      !location?.city
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (!["farmer", "buyer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (buyerType && !["individual", "business"].includes(buyerType)) {
      return res.status(400).json({ message: "Invalid buyerType" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      name,
      location,
      buyerType: buyerType || "individual",
      createdAt: new Date(),
    });

    await user.save();

    res.status(201).json({ userId: user._id, message: "User created" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
    //I should query a query object and not a string. {email} is a query object while "email" is a string
    //Its better to retrive the whole document and the access the properties
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        userId: user._id,
        name: user.name,
      };
      const options = {
        expiresIn: "1h",
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      res.status(200).json({ message: "Authentication Successful", token });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      res.status(400).json({ message: "The user does not exist" });
      return;
    }

    const { name, location, role, buyerType } = user;
    res
      .status(200)
      .json({ message: "User found", name, role, location, buyerType });
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ message: "There is an internal server error" });
  }
});

router.post("/login/google", async (req, res) => {
  try {
    const { googleId } = req.body;
    if (!googleId) {
      res.status(400).json({ message: "No google Id provided" });
      return;
    }

    const user = await User.findOne({ googleId: googleId });
    if (user) {
      const payload = {
        userId: user._id,
        name: user.name,
      };
      const options = {
        expiresIn: "1h",
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, options);
      res.status(200).json({ message: "Authentication Successful", token });
    } else {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
  } catch (error) {
    console.error("Server Error", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
