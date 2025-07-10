const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // Add CORS
const authRoutes = require("../routes/auth");
const listingsRoutes = require("../routes/listing");
const purchasesRoutes = require("../routes/purchase");
const cropReferencesRoutes = require("../routes/cropreference");
const disputesRoutes = require("../routes/dispute");
const messagesRoutes = require("../routes/messages");
const { Server } = require("socket.io");
const http = require("http");

dotenv.config();
const app = express();

// Enable CORS for frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Your React frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // If using cookies/auth headers
  })
);

app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Match frontend URL
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

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
  socket.on("join", (listingId) => {
    socket.join(`listing:${listingId}`);
    console.log(`User ${socket.userId} joined listing:${listingId}`);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Financial Inclusion Platform API"));
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/purchases", purchasesRoutes);
app.use("/api/crop-references", cropReferencesRoutes);
app.use("/api/disputes", disputesRoutes);
app.use("/api/messages", messagesRoutes);

app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 6000;
server
  .listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on("error", (err) => console.error("Server startup error:", err));
