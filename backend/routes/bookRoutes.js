const express = require("express");
const Book = require("../models/Book");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  const { q } = req.query;
  const filter = q ? { title: { $regex: q, $options: "i" } } : {};
  const books = await Book.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, books });
});

router.post("/", protect, adminOnly, async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ success: true, book });
});

router.put("/:id", protect, adminOnly, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, book });
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Book deleted" });
});

module.exports = router;
