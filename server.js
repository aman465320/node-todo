const app = require("./app.js");

const callDb = require("./db/db.js");
// database
callDb();
app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
