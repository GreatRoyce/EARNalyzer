const mongoose = require("mongoose");

require("dotenv").config();

const dbConnectionString = process.env.DBSTRING;

const connectDB = async () => {
  if (!dbConnectionString) {
    throw new Error("DBSTRING environment variable is missing.");
  }

  console.log("Connecting to db...");
  await mongoose.connect(dbConnectionString);
  console.log("Connection to db established.");
};

module.exports = connectDB;
