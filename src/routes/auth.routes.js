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
    failureRedirect: "/"
  }),
  (req, res) => {
    res.send("Google login successful");
  }
);

module.exports = router;