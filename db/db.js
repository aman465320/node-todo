const { default: mongoose } = require("mongoose");

const connectDb = () => {
  mongoose
    .connect(process.env.URL)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDb;
