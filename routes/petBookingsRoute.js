const express = require("express");
const router = express.Router();
const Booking = require("../models/petBookingModel");
const Pet = require("../models/petModel");

router.post("/bookpet", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();

    //Linking bookied time slots to sitter
    const pet = await Pet.findOne({ _id: req.body.pet });
    console.log(req.body.pet);
    pet.bookedTimeSlots.push(req.body.bookedTimeSlots);

    await pet.save();
    res.send("Your booking was successful");
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;