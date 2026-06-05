const express = require("express");
const Fee = require("../models/Fee");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/my", protect, async (req, res) => {
  const fees = await Fee.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, fees });
});

router.get("/", protect, adminOnly, async (req, res) => {
  const fees = await Fee.find().populate("student", "name email phone").sort({ createdAt: -1 });
  res.json({ success: true, fees });
});

router.post("/", protect, adminOnly, async (req, res) => {
  const fee = await Fee.create(req.body);
  res.status(201).json({ success: true, fee });
});

module.exports = router;
