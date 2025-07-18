const express = require("express");
const router = express.Router();
const { register, login } = require('../controllers/userController.js');
const verifyToken = require('../middleware/verifyToken.js');
const User =require('../models/user.js');
const IsAdmin =require('../middleware/IsAdmin.js')
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user, {
      attributes: ['id', 'username', 'email','role', 'createdAt'] // hide password
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Authenticated profile details",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;

