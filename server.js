const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
//const dbConnection = require("./db");
const dbConnection = process.env.db;
app.use(express.json());
//const uri = process.env.MONGODB_URI;
//const dbConnection = process.env.MONGODB_URI;

app.use("/api/sitters/", require("./routes/sittersRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use("/api/bookings/", require("./routes/bookingsRoute"));

const path = require("path");

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Node JS Server started on Port ${port}!`));
