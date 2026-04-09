const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/microsoft", passport.authenticate("azuread-openidconnect"));

router.post(
  "/microsoft/callback",
  passport.authenticate("azuread-openidconnect", { failureRedirect: "/auth/failure" }),
  (req, res) => {
    res.json({
      message: "Microsoft OAuth success",
      user: req.user
    });
  }
);

router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  res.json({ user: req.user });
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session?.destroy(() => res.json({ message: "Logged out" }));
  });
});

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Microsoft OAuth failed" });
});

module.exports = router;

