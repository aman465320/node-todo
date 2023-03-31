const express = require("express");
const {
  newTask,
  getUserTask,
  updateTask,
  deleteTask,
} = require("../controllers/task");
const router = express.Router();
const isAuthenticated = require("../middlewares/auth");
router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, getUserTask);
router
  .route("/change/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);
module.exports = router;
