const express = require("express");
const router = express.Router();

// Multer upload middleware (expects field name 'image')
const upload = require("../middleware/upload");

const {
  createClaim,
  getClaims,
  approveClaim,
  rejectClaim
} = require("../controllers/claim.controller");

// Use upload.single('image') before the controller so req.file is populated
router.post("/", upload.single('image'), createClaim);
router.get("/", getClaims);
router.patch("/:id/approve", approveClaim);
router.patch("/:id/reject", rejectClaim);

module.exports = router;