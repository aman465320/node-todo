const jwt = require("jsonwebtoken");

const sendCookie = (user, res, cookieStatus, sendMsg) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);
  res
    .status(cookieStatus)
    .cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 60 * 1000),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: sendMsg,
    });
};
module.exports = sendCookie;
