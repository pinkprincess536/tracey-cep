const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

async function start() {
  const dbOk = await connectDB();
  if (!dbOk) {
    console.warn(
      "[db] startup: MongoDB not connected. Requests that hit the database will fail until connectivity is fixed."
    );
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("[startup] fatal error:", err);
  process.exitCode = 1;
});