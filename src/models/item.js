const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,        // removes extra spaces
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ['Electronics', 'Clothing', 'Documents', 'Keys', 'Wallet', 'Other'],
      required: true,
    },

    type: {
      type: String,
      enum: ['lost', 'found'],   // is this a lost item or found item?
      required: true,
    },

    imageUrl: {
      type: String,
      default: '',  
       required: true,             // empty until image is uploaded
    },

    location: {
      type: String,
      required: true,            // where was it lost/found?
    },

    date: {
      type: Date,
      required: true,            // when was it lost/found?
    },

    postedBy: {
      type: String,
      required: true,            // we'll store user email for now
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'claimed'],
      default: 'pending',        // admin must approve before it shows publicly
    },

    isClaimed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,            // auto adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Item', itemSchema);