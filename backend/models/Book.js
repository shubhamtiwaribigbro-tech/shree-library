const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: "Unknown" },
  category: { type: String, default: "General" },
  totalCopies: { type: Number, default: 1 },
  availableCopies: { type: Number, default: 1 },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);
