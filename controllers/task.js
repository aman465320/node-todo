const { ErrorHandling } = require("../middlewares/error.js");
const Task = require("../models/task.js");

const newTask = async (req, res, next) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user });
  await task.save();
  //   console.log(isCompleted);
  res.status(201).json({
    success: true,
    message: "task added successfully",
    task,
  });
};
const getUserTask = async (req, res, next) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });
  res.status(200).json({
    success: true,
    message: "got tasks successfully",
    tasks,
  });
  console.log(tasks);
};

const updateTask = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId)
    .then()
    .catch((e) => {});

  if (!task) {
    return next(new ErrorHandling("invalid", 404));
  }

  task.isCompleted = !task.isCompleted;
  await task.save();
  res.status(200).json({
    success: true,
    message: "updated task successfully",
    task,
  });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findById(taskId)
    .then()
    .catch((e) => {});

  if (!task) {
    return next(new ErrorHandling("invalid", 404));
  }
  await task.deleteOne();

  res.status(200).json({
    success: true,
    message: "deleted task successfully",
  });
};

module.exports = { newTask, getUserTask, updateTask, deleteTask };
