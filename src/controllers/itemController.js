const Item = require('../models/item');

// POST /api/items — Create a new item
const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date,
      postedBy,
    } = req.body;

    // Create the item in MongoDB
    const newItem = await Item.create({
      title,
      description,
      category,
      type,
      location,
      date,
      postedBy,
    });

    res.status(201).json({
      success: true,
      message: 'Item posted successfully',
      item: newItem,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createItem };