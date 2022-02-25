const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://adelle:adelle@cluster0.5tooc.mongodb.net/woofdaycare",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
<<<<<<< HEAD
    console.log("Mongo DB Connection Successful");
=======
    console.log("Mongo DB Connection Successfull");
>>>>>>> master
  });

  connection.on("error", () => {
    console.log("Mongo DB Connection Error");
  });
}

connectDB();

module.exports = mongoose;
