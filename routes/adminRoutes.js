const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const verifyToken = require('../middleware/verifyToken.js');
const IsAdmin = require('../middleware/IsAdmin.js');

// Get all users – Admin only
router.get('/users', verifyToken, IsAdmin, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role'] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user role – Admin only
router.put('/users/:id/role', verifyToken, IsAdmin, async (req, res) => {
  const { role } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = role;
    await user.save();
    res.status(200).json({ message: "User role updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
