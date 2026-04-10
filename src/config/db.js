const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
function redactMongoUri(uri) {
  if (!uri) return "";
  // Strip credentials while keeping scheme + hostname + path db name (if any)
  // Examples:
  // mongodb+srv://user:pass@cluster.mongodb.net/mydb?... -> mongodb+srv://<redacted>@cluster.mongodb.net/mydb
  // mongodb://user:pass@h1,h2/db?... -> mongodb://<redacted>@h1,h2/db
  return uri
    .replace(/\/\/[^@]*@/i, "//<redacted>@")
    .replace(/\?.*$/, "");
}

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri || mongoUri.includes("<")) {
    console.warn("[db] MONGO_URI is not set to a real connection string.");
    return false;
  }

  try {
    // Mongoose buffers commands by default; keep it on, but make connection state obvious.
    mongoose.connection.on("error", (err) => {
      console.error("[db] connection error:", err.message);
    });

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000
    });
    console.log("MongoDB connected");
    console.log(
      `[db] connected to db="${mongoose.connection.name}" host="${mongoose.connection.host}" uri="${redactMongoUri(
        mongoUri
      )}"`
    );
    return true;
  } catch (error) {
    console.error("DB connection error:", error);
    // Keep the server running so non-DB routes (e.g. OAuth redirect) can still work.
    // DB-backed features will fail until MONGO_URI/connectivity is fixed.
    console.error(`[db] failed uri="${redactMongoUri(mongoUri)}"`);
    return false;
  }
};

module.exports = connectDB;