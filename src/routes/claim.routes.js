const express = require("express");
const router = express.Router();

const {
  createClaim,
  getClaims,
  approveClaim,
  rejectClaim
} = require("../controllers/claim.controller");

router.post("/", createClaim);
router.get("/", getClaims);
router.patch("/:id/approve", approveClaim);
router.patch("/:id/reject", rejectClaim);

module.exports = router;