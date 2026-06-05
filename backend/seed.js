const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Seat = require("./models/Seat");
const Book = require("./models/Book");

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await Seat.deleteMany({});
    await Book.deleteMany({});

    const adminEmail = process.env.ADMIN_EMAIL || "admin@shreelibrary.in";
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
      admin = await User.create({
        name: process.env.ADMIN_NAME || "Admin",
        email: adminEmail,
        password: hashed,
        role: "admin",
        phone: "9555529599"
      });
    }

    const seats = [];
    for (let i = 1; i <= 125; i++) {
      const row = i <= 25 ? "A" : i <= 50 ? "B" : i <= 75 ? "C" : i <= 100 ? "D" : "E";
      seats.push({ seatNumber: i, row, status: "available" });
    }
    await Seat.insertMany(seats);

    await Book.insertMany([
      { title: "Python Programming", author: "Shree Library", category: "Programming", totalCopies: 5, availableCopies: 5 },
      { title: "Cloud Computing", author: "BTEUP Notes", category: "Computer Science", totalCopies: 3, availableCopies: 3 },
      { title: "Data Science", author: "Library Collection", category: "Technology", totalCopies: 2, availableCopies: 2 },
      { title: "General Knowledge", author: "Competition", category: "Competitive Exams", totalCopies: 10, availableCopies: 10 },
      { title: "Hindi Grammar", author: "Competition", category: "Language", totalCopies: 8, availableCopies: 8 }
    ]);

    console.log("Seed completed.");
    console.log(`Admin Login: ${adminEmail} / ${process.env.ADMIN_PASSWORD || "admin123"}`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
