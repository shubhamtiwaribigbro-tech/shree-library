const express = require("express");
const Seat = require("../models/Seat");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const seats = await Seat.find().populate("student", "name email phone").sort({ seatNumber: 1 });
  res.json({ success: true, seats });
});

router.post("/book/:seatNumber", protect, async (req, res) => {
  const seat = await Seat.findOne({ seatNumber: Number(req.params.seatNumber) });
  if (!seat) return res.status(404).json({ success: false, message: "Seat not found" });
  if (seat.status !== "available") return res.status(400).json({ success: false, message: "Seat not available" });

  await Seat.updateMany({ student: req.user._id }, { status: "available", student: null });

  seat.status = "reserved";
  seat.student = req.user._id;
  await seat.save();

  await User.findByIdAndUpdate(req.user._id, { seatNumber: seat.seatNumber });

  res.json({ success: true, message: "Seat reserved successfully", seat });
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const seat = await Seat.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, seat });
});

module.exports = router;
