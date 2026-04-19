const express = require("express");
const router = express.Router();

const { createItem, getItems, approveItem, rejectItem } = require("../controllers/itemController");

// Create new item
router.post("/", createItem);

// Get all items
router.get("/", getItems);

// Approve item
router.patch("/:id/approve", approveItem);

// Reject item
router.patch("/:id/reject", rejectItem);

module.exports = router;