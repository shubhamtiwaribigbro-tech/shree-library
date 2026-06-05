const express = require("express");
const User = require("../models/User");
const Fee = require("../models/Fee");
const Attendance = require("../models/Attendance");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, adminOnly, async (req, res) => {
  const students = await User.find({ role: "student" }).select("-password").sort({ createdAt: -1 });
  res.json({ success: true, students });
});

router.get("/dashboard", protect, async (req, res) => {
  const fees = await Fee.find({ student: req.user._id }).sort({ createdAt: -1 });
  const attendance = await Attendance.find({ student: req.user._id }).sort({ createdAt: -1 }).limit(20);

  res.json({
    success: true,
    student: req.user,
    fees,
    attendance,
    libraryTiming: "24x7"
  });
});

module.exports = router;
