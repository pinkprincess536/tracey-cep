const Item = require("../models/item");

const createItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      date
    } = req.body;

    const imageUrl = req.file ? `uploads/${req.file.filename}` : undefined;

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

const approveItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    item.status = "approved";
    await item.save();

    res.json({ success: true, message: "Item approved", item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Item rejected", item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    const allowedStatuses = ['pending', 'approved', 'rejected', 'claimed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const item = await Item.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: `Item status updated to ${status}`, item });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createItem, getItems, approveItem, rejectItem, updateItemStatus };
