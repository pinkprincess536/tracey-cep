const express = require("express");
const passport = require("passport");

const router = express.Router();

// Google login
router.get("/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// Google callback
router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5500/index.html?error=auth_failed"
  }),
  (req, res) => {
    const adminEmail = process.env.ADMIN_EMAIL || "aswathipillai999@gmail.com";
    
    // Redirect admin to dashboard, normal users to home
    if (req.user && req.user.email === adminEmail) {
      res.redirect("http://localhost:5500/admin.html");
    } else {
      res.redirect("http://localhost:5500/index.html");
    }
  }
);

// Get current user
router.get("/me", (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
});

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ success: false, message: "Logout error" });
    
    // Completely destroy the session on the backend
    req.session.destroy(() => {
      // Clear the session cookie from the browser
      res.clearCookie("connect.sid"); 
      res.redirect("http://localhost:5500/index.html");
    });
  });
});

module.exports = router;