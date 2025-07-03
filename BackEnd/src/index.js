const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("../routes/auth");
const listingsRoutes = require("../routes/listing");
const purchasesRoutes = require("../routes/purchase");
const cropReferencesRoutes = require("../routes/cropreference");
const disputesRoutes = require("../routes/dispute");
const messagesRoutes = require("../routes/messages");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config(); // Load .env variables
const app = express(); // Create Express server
app.use(express.json()); // Parse JSON request bodies

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust for production (e.g., React frontend URL)
    methods: ["GET", "POST"],
  },
});

// Store Socket.IO instance for routes
app.set("io", io);

// Socket.IO connection handling
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: No token provided"));
  }

  try {
    const decoded = require("jsonwebtoken").verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    socket.userId = decoded.userId;
    next();
  } catch (error) {
    next(new Error("Authentication error: Invalid token"));
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Join listing room
  socket.on("join", (listingId) => {
    socket.join(`listing:${listingId}`);
    console.log(`User ${socket.userId} joined listing:${listingId}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});
// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => res.send("Financial Inclusion Platform API"));
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/crop-references", cropReferencesRoutes);
app.use("/api/disputes", disputesRoutes);
app.use("/api/messages", messagesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Server error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app
  .listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on("error", (err) => console.error("Server startup error:", err));
