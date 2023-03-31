const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "login first",
    });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
module.exports = isAuthenticated;
