const express = require("express");

const bodyParser = require("body-parser");

const userRouter = require("./routes/userRoutes.js");
const taskRouter = require("./routes/taskRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares/error.js");
require("dotenv").config({
  path: "./db/config.env",
});

const app = express();

// middlewares
app.set(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin : [process.env.PORT],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter);

// routes
app.get("/", (req, res) => {
  res.send("started");
});

// error middleware
app.use(errorHandler);

module.exports = app;
