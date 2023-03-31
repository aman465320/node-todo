const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features");
const { ErrorHandling } = require("../middlewares/error");
const getAllUsers = async (req, res) => {};

const registerNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandling("User Already Exists", 400));
  } else {
    const hash = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hash,
    });
    user.save();
    sendCookie(user, res, 201, "Registered Successfully");
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    console.log(user);
  }
  if (!user) {
    return next(new ErrorHandling("Invalid email or password", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandling("Invalid email or password", 404));
  }
  sendCookie(user, res, 200, `Welcome back ${user.name}`);
};

const getUserProfile = async (req, res) => {
  res.status(201).json({
    success: true,
    user: req.user,
  });
};

const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

module.exports = {
  getAllUsers,
  registerNewUser,
  loginUser,
  getUserProfile,
  logoutUser,
};
