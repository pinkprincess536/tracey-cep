const User = require("../models/user");

// Create test user
const createTestUser = async (req, res) => {
  try {
    const nonce = Date.now();

    const user = await User.create({
      name: "Test User",
      email: `test+${nonce}@example.com`,
      googleId: `test-${nonce}` // ✅ FIXED
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTestUser
};