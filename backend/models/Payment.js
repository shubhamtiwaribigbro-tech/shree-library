const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fee: { type: mongoose.Schema.Types.ObjectId, ref: "Fee" },
  amount: { type: Number, required: true },
  upiTransactionId: { type: String },
  screenshot: { type: String },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verifiedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
