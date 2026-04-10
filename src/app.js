const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const itemRoutes = require("./routes/itemRoutes"); // ✅ ADD THIS
const configurePassport = require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// 🔥 TEMP MOCK USER (VERY IMPORTANT FOR NOW)
app.use((req, res, next) => {
  req.user = {
    _id: "660000000000000000000001" // valid ObjectId format
  };
  next();
});
  

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
app.use("/api/items", itemRoutes); // ✅ THIS FIXES YOUR ERROR

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;