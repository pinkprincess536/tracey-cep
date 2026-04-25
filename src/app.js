const express = require("express");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/itemRoutes"); // 
const claimRoutes = require("./routes/claim.routes");
const configurePassport = require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// IMPORTANT: Enable CORS with credentials for frontend
app.use(cors({
  origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
  credentials: true
}));

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_session_secret_change_me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Passport (you can keep it, but it's not needed now)
try {
  const ok = configurePassport();
  if (!ok) {
    console.warn(
      "[auth] Google OAuth not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET."
    );
  }
} catch (err) {
  console.warn("[auth] Error configuring Google OAuth:", err.message);
}

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/api/items", itemRoutes); // 
app.use("/api/claims", claimRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;