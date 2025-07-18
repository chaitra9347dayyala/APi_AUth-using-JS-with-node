const express = require("express");
const router = express.Router();
const { register, login } = require('../controllers/userController.js');
const verifyToken = require('../middleware/verifyToken.js');
router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({
    message: "This is a protected profile route",
    user: req.user
  });
});

module.exports = router;

