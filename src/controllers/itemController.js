const Item = require("../models/item");

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      imageUrl
    } = req.body;

    const newItem = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      imageUrl
    });

    res.status(201).json({
      success: true,
      message: "Item posted successfully",
      item: newItem,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getItems = async (req, res) => {
  try {
    const { category, type } = req.query;

    let filter = {};

    const allowedCategories = [
      "Electronics",
      "Clothing",
      "Documents",
      "Keys",
      "Wallet",
      "Bags",
      "Other"
    ];

    // Strict category check
    if (category && allowedCategories.includes(category)) {
      filter.category = category;
    }

    // Type filter
    if (type) {
      filter.type = type;
    }
s
    const items = await Item.find(filter);

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { createItem, getItems };
