const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  checkIn: { type: Date, default: Date.now },
  checkOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
