const express = require("express");
const Book = require("../models/Book");
const Fee = require("../models/Fee");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/chat", protect, async (req, res) => {
  const { message } = req.body;
  const msg = (message || "").toLowerCase();

  if (msg.includes("timing") || msg.includes("time") || msg.includes("समय") || msg.includes("टाइम")) {
    return res.json({ success: true, reply: "Shree Library 24×7 open है।" });
  }

  if (msg.includes("membership") || msg.includes("plan") || msg.includes("सदस्यता")) {
    return res.json({ success: true, reply: "Membership plans: Basic ₹300/month, Premium ₹750/month, VIP ₹1000/month." });
  }

  if (msg.includes("fee") || msg.includes("फीस")) {
    const fees = await Fee.find({ student: req.user._id }).sort({ createdAt: -1 }).limit(3);
    return res.json({ success: true, reply: fees.length ? `आपकी latest fee status: ${fees[0].status}, amount ₹${fees[0].amount}` : "आपकी fee record अभी available नहीं है।" });
  }

  if (msg.includes("book") || msg.includes("किताब") || msg.includes("पुस्तक")) {
    const books = await Book.find().limit(5);
    return res.json({ success: true, reply: books.length ? `Available books: ${books.map(b => b.title).join(", ")}` : "अभी कोई book database में add नहीं है।" });
  }

  res.json({
    success: true,
    reply: "मैं Library Guru हूँ। आप book search, fee status, membership plans, seat और library timing पूछ सकते हैं।"
  });
});

module.exports = router;
