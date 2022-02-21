const { response } = require("express");
const express = require("express");
const router = express.Router();
const Sitter = require("../models/sitterModel");

router.get("/getallsitters", async (req, res) => {
  try {
    const sitters = await Sitter.find();
    res.send(sitters);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/addsitter", async (req, res) => {
  try {
    const newsitter = new Sitter(req.body);
    await newsitter.save();
    res.send("Sitter added successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/editsitter", async (req, res) => {
  //Adding manual properties as may impact booked time slots if MongoDb findOne() used
  try {
    const sitter = await Sitter.findOne({ _id: req.body._id });
    sitter.name = req.body.name;
    sitter.image = req.body.image;
    sitter.ratePerHour = req.body.ratePerHour;
    sitter.experienceLevel = req.body.experienceLevel;
    sitter.dogType = req.body.dogType;

    await sitter.save();

    res.send("Sitter details updatded successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/deletesitter", async (req, res) => {
  try {
    await Sitter.findOneAndDelete({ _id: req.body.sitterid });

    res.send("Sitter deleted successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});
module.exports = router;
