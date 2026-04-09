const express = require("express");
const router = express.Router();

const { createTestUser } = require("../controllers/user.controller");

router.get("/test-user", createTestUser);

module.exports = router;