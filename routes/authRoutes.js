const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Endpoint untuk generate token JWT
router.post("/login", authController.generateToken);

module.exports = router;
