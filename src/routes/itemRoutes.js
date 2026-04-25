const express = require("express");
const router = express.Router();

const { createItem, getItems, approveItem, rejectItem, updateItemStatus } = require("../controllers/itemController");
const upload = require("../middleware/upload");

// Create new item
router.post("/", upload.single('image'), createItem);

// Get all items
router.get("/", getItems);

// Approve item
router.patch("/:id/approve", approveItem);

// Reject item
router.patch("/:id/reject", rejectItem);

// Update arbitrary status 
router.patch("/:id/status", updateItemStatus);

module.exports = router;