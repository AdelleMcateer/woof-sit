const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Sitter = require("../models/sitterModel");

router.post("/booksitter", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();

    //Linking bookied time slots to sitter
    const sitter = await Sitter.findOne({ _id: req.body.sitter });
    sitter.bookedTimeSlots.push(req.body.bookedTimeSlots);

    await sitter.save();
    res.send("Your booking was successful");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
