const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      province: { type: String, required: true },
      city: { type: String, required: true },
      town: { type: String },
      neighborhood: { type: String },
    },
    buyerType: {
      type: String,
      enum: ["individual", "business"],
      default: "individual",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
