const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    // Keep the server running so non-DB routes (e.g. OAuth redirect) can still work.
    // DB-backed features will fail until MONGO_URI/connectivity is fixed.
  }
};

module.exports = connectDB;