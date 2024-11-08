const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Create User
router.post("/users", auth, userController.createUser);

// Read User by ID (with Redis caching)
router.get("/users/:id", auth, userController.getUser);

// Update User by ID
router.put("/users/:id", auth, userController.updateUser);

// Delete User by ID
router.delete("/users/:id", auth, userController.deleteUser);

// Mendapatkan user berdasarkan accountNumber
router.get(
  "/users/account/:accountNumber",
  auth,
  userController.getUserByAccountNumber
);

// Mendapatkan user berdasarkan identityNumber
router.get(
  "/users/identity/:identityNumber",
  auth,
  userController.getUserByIdentityNumber
);

module.exports = router;
