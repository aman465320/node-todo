const express = require("express");
const {
  getAllUsers,
  registerNewUser,
  loginUser,
  getUserProfile,
  logoutUser,
} = require("../controllers/user.js");
const isAuthenticated = require("../middlewares/auth.js");
const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", registerNewUser);

router.post("/login", loginUser);

// dynamic routing
router.get("/me", isAuthenticated, getUserProfile);

router.get("/logout", logoutUser);

module.exports = router;
