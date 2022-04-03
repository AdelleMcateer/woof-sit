const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");
app.use(express.json());

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client/build")));
}

app.use("/api/sitters/", require("./routes/sittersRoute"));
app.use("/api/pets/", require("./routes/petsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));
app.use("/api/petbookings/", require("./routes/petBookingsRoute"));

app.get("/", (req, res) => res.send("Hello World!"));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client/build/index.html"));
});


/*const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
*/

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));

module.exports = app;
