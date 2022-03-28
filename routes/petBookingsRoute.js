const express = require("express");
const PetBooking = require("../models/petBookingModel");
const router = express.Router();
const Pet = require("../models/petModel");

router.post("/bookpet", async (req, res) => {
  req.body.transactionId = "1234";
  try {
    const newpetbooking = new PetBooking(req.body);
    await newpetbooking.save();

    //Linking booked time slots to sitter
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

router.get("/getallpetbookings", async (req, res) => {
  try {
    const petbookings = await PetBooking.find().populate("pet");
    res.send(petbookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;

