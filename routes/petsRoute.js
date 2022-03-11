const { response } = require("express");
const express = require("express");
const router = express.Router();
const Pet = require("../models/petModel");

router.get("/getallpets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.send(pets);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addpet", async (req, res) => {
  try {
    const newpet = new Pet(req.body);
    await newpet.save();
    res.send("Pet added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editpet", async (req, res) => {
  //Adding manual properties as may impact booked time slots if MongoDb findOne() used
  try {
    const pet = await Pet.findOne({ _id: req.body._id });
    pet.name = req.body.name;
    pet.image = req.body.image;
    pet.ratePerHour = req.body.ratePerHour;
    pet.experienceLevel = req.body.experienceLevel;
    pet.dogType = req.body.dogType;

    await pet.save();

    res.send("Pet details updatded successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletepet", async (req, res) => {
  try {
    await Pet.findOneAndDelete({ _id: req.body.petid });

    res.send("Pet deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;
