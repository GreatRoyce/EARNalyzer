const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");
const connectDB = require("../config/dbConnection");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = process.env.ADMIN_EMAIL || "earnalyzer@gmail.com";
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log("Admin already exists, no changes made");
      process.exit();
    }

    const admin = await User.create({
      username: "Admin",
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD , 
      role: "admin",
      isVerified: true,
    });

    console.log("Admin user created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
