const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const configurePassport = require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

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

try {
  const ok = configurePassport();
  if (!ok) {
    console.warn(
      "[auth] Microsoft OAuth not configured. Set MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_REDIRECT_URL."
    );
  }
} catch (err) {
  console.warn(
    "[auth] Microsoft OAuth not configured. Set MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, MICROSOFT_REDIRECT_URL (and optionally MICROSOFT_TENANT_ID)."
  );
}

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;