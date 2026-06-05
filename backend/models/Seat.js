const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  seatNumber: { type: Number, required: true, unique: true },
  row: { type: String },
  status: { type: String, enum: ["available", "occupied", "reserved"], default: "available" },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Seat", seatSchema);
