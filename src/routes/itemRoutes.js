const express = require("express");
const router = express.Router();

const { createItem, getItems } = require("../controllers/itemController");

// Create new item
router.post("/", createItem);

// Get all items
router.get("/", getItems);

module.exports = router;