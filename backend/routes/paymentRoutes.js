const express = require("express");
const multer = require("multer");
const path = require("path");
const Payment = require("../models/Payment");
const Fee = require("../models/Fee");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "-"))
});

const upload = multer({ storage });

router.post("/upi", protect, upload.single("screenshot"), async (req, res) => {
  const { amount, upiTransactionId, fee } = req.body;

  const payment = await Payment.create({
    student: req.user._id,
    fee,
    amount,
    upiTransactionId,
    screenshot: req.file ? `/uploads/${req.file.filename}` : "",
    status: "pending"
  });

  if (fee) await Fee.findByIdAndUpdate(fee, { status: "pending_verification" });

  res.status(201).json({ success: true, message: "Payment submitted for verification", payment });
});

router.get("/", protect, adminOnly, async (req, res) => {
  const payments = await Payment.find().populate("student", "name email phone").populate("fee").sort({ createdAt: -1 });
  res.json({ success: true, payments });
});

router.put("/:id/verify", protect, adminOnly, async (req, res) => {
  const { status } = req.body;
  const payment = await Payment.findById(req.params.id);

  if (!payment) return res.status(404).json({ success: false, message: "Payment not found" });

  payment.status = status;
  payment.verifiedBy = req.user._id;
  payment.verifiedAt = new Date();
  await payment.save();

  if (payment.fee && status === "approved") {
    await Fee.findByIdAndUpdate(payment.fee, { status: "paid", paidAt: new Date() });
  }

  res.json({ success: true, message: `Payment ${status}`, payment });
});

module.exports = router;
