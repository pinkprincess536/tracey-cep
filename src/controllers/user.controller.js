const User = require("../models/user");

// Create test user
const createTestUser = async (req, res) => {
  try {
    const user = await User.create({
      name: "Test User",
      email: "test@example.com",
      microsoftId: "123456"
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTestUser
};