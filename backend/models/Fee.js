const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: String, enum: ["Basic", "Premium", "VIP"], required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  status: { type: String, enum: ["due", "pending_verification", "paid"], default: "due" },
  dueDate: { type: Date },
  paidAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Fee", feeSchema);
