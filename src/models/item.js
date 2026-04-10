const mongoose = require('mongoose');
require("./user"); // ✅ force Mongoose to register User model
const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Documents', 'Keys', 'Wallet', 'Bags', 'Other'],
      required: true,
    },

    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },

    imageUrl: {
      type: String,
      default: '', // ✅ fixed
    },

    location: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'claimed'],
      default: 'pending',
    },

    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Item', itemSchema);